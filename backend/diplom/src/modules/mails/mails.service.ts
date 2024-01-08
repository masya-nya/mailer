import { Injectable } from '@nestjs/common';
import { ImapFlow } from 'imapflow';
import { EmailDocument } from '../email/models/email.model';
import { Logger } from 'src/core/logger/Logger';
import { EmailService } from '../email/email.service';
import { Types } from 'mongoose';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { ImapService } from 'src/core/services/imap/imap.service';
import MailsInfo from 'src/core/consts/mailsinfo';
import { ServiceFolders } from './consts/serviceFolders';
import {
	GetMailRDO,
	GetMailsPageRDO,
	MailCountInBoxesRDO,
	MailRDO,
} from './types/mails.rdo';
import { GetPageOfMailsDTO } from './DTO/get-page-of-mails.dto';
import {
	SmtpService,
	SmtpTransporterType,
} from 'src/core/services/smtp/smtp.service';
import { GetOneMailDTO } from './DTO/get-one-mail.dto';
import { SendMessasgeDTO } from './DTO/send-message.dto';
import { Attachment as MailRdoAttachment } from './types/mails.rdo';
import { Attachment } from 'nodemailer/lib/mailer';
import * as dayjs from 'dayjs';
import { setTimeout } from 'node:timers/promises';
import { GetMailsCountDTO } from './DTO/get-mails-count.dto';
import { MailsSetFlagDTO } from './DTO/mails-set-flag.dto';
import { MailsMoveMessageDTO } from './DTO/mails-move-message.dto';

@Injectable()
export class MailsService {
	constructor(
		private readonly logger: Logger,
		private readonly emailService: EmailService,
		private readonly imapService: ImapService,
		private readonly smtpService: SmtpService
	) {}

	public async initImap(
		accountId: Types.ObjectId,
		userEmail: string
	): Promise<[ImapFlow, EmailDocument]> {
		const loggerContext = `${MailsService.name}/${this.initImap.name}`;
		try {
			const emailInstance = await this.emailService.find({
				accountId,
				email: userEmail,
			});
			if (!emailInstance) {
				ApiError.NotFound('Такой Email не был найден');
			}
			await this.emailService.updateToken(accountId, emailInstance);

			const imap = this.imapService.create(
				emailInstance.email,
				MailsInfo[emailInstance.serviceName].ImapHost,
				emailInstance.accessToken
			);

			return [imap, emailInstance];
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error.message);
		}
	}

	public async initSmtp(
		accountId: Types.ObjectId,
		userEmail: string
	): Promise<[SmtpTransporterType, EmailDocument]> {
		const loggerContext = `${MailsService.name}/${this.initSmtp.name}`;
		try {
			const emailInstance = await this.emailService.find({
				accountId,
				email: userEmail,
			});
			if (!emailInstance) {
				ApiError.NotFound('Такой Email не был найден');
			}

			await this.emailService.updateToken(accountId, emailInstance);

			const { email, serviceName, accessToken } = emailInstance;

			const transporter = this.smtpService.create(
				email,
				MailsInfo[serviceName].SmtpHost,
				accessToken
			);

			return [transporter, emailInstance];
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error.messages);
		}
	}

	private adapterResendMailsHtmlRdo(
		mailHtml: string,
		referencedMails: MailRDO[]
	): string {
		const treatedReferencesHtml = referencedMails
			.map(mail => {
				return `<div>
                    <div>
                        ---------- Пересланное сообщение ----------
                        <br>
                        <strong>
                            \"${mail.from.value[0].name}\" &#60;${
	mail.from.value[0].address
}&#62;:
                        </strong>
                    </div>
                    <br>
                    <br>
                    <br>
                    <div>
                        ${mail.html || mail.text || 'Сообщение без текста'}
                    </div>
                    <br>
                    <br>
                    <br>
                    <div>---------- Конец пересланного сообщения ----------</div>
                </div>`;
			})
			.join('<br><br><br>');

		return `<div>
                    <div>${mailHtml}</div>
                    <br><br><br>
                    ${treatedReferencesHtml}
            </div>`;
	}

	private adapterMailsRdo(
		page: number,
		limit: number,
		mails: MailRDO[] = [],
		totalCount = 0
	): GetMailsPageRDO {
		return {
			infoMsg: `Вы получили ${mails.length} писем`,
			mailsCount: totalCount,
			page,
			limit,
			mails: mails,
		};
	}

	public async getPageByDateAndQuery(
		getPageOfMailsDTO: GetPageOfMailsDTO
	): Promise<GetMailsPageRDO> {
		const loggerContext = `${MailsService.name}/${this.getPageByDateAndQuery.name}`;
		const { accountId, email, limit, mailboxPath, page } =
			getPageOfMailsDTO;
		try {
			const [imap, { serviceName }] = await this.initImap(
				accountId,
				email
			);
			await imap.connect();

			const lock = await imap.getMailboxLock(
				mailboxPath in ServiceFolders[serviceName]
					? ServiceFolders[serviceName][mailboxPath]
					: mailboxPath
			);

			const foundMails = await this.imapService.querySearchMails(
				imap,
				{}
			);

			const foundMailsCount = foundMails.length;

			if (!foundMailsCount) {
				return this.adapterMailsRdo(page, limit);
			}

			const isWrongPage = foundMailsCount - limit * (page - 1) < 0;
			if (page > 1 && isWrongPage) {
				ApiError.BadRequest('Wrong page number');
			}

			const mailsDiff = foundMailsCount - limit * page;
			const startPage = mailsDiff >= 0 ? mailsDiff : 0;
			const endPage =
				mailsDiff >= 0 ? startPage + limit : mailsDiff + limit;
			const msgsQuery = foundMails.slice(startPage, endPage).join(',');

			const mails = await this.imapService.getMailsByQuery(imap, {
				seq: msgsQuery,
			});

			lock.release();
			await imap.logout();

			return this.adapterMailsRdo(page, limit, mails, foundMailsCount);
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error.message);
		}
	}

	public async getMessageById(
		getOneMailDTO: GetOneMailDTO,
		msgSeq: string
	): Promise<GetMailRDO> {
		const { accountId, email, mailboxPath } = getOneMailDTO;
		try {
			const [imap, { serviceName }] = await this.initImap(
				accountId,
				email
			);
			await imap.connect();
			const lock = await imap.getMailboxLock(
				mailboxPath in ServiceFolders[serviceName]
					? ServiceFolders[serviceName][mailboxPath]
					: mailboxPath
			);

			const mail = await this.imapService.getOneMail(imap, msgSeq);

			lock.release();
			await imap.logout();

			return {
				mail: mail,
			};
		} catch (error) {
			this.logger.error(error);
			ApiError.InternalServerError(error.message);
		}
	}

	public async getMailCountInBoxes({
		accountId,
		email,
	}: GetMailsCountDTO): Promise<MailCountInBoxesRDO> {
		const loggerContext = `${MailsService.name}/${this.getMailCountInBoxes.name}`;

		try {
			const [imap] = await this.initImap(accountId, email);

			await imap.connect();
			const boxes = await imap.list({
				statusQuery: { messages: true, unseen: true },
			});
			await imap.logout();

			const mailCountInBoxes: MailCountInBoxesRDO = {
				inbox: 0,
				sent: 0,
				spam: 0,
				deleted: 0,
				attachments: 0,
			};

			for (const box of boxes) {
				const specialUse = box.specialUse || null;
				if (!specialUse) {
					continue;
				}
				if (/inbox/gi.test(box.specialUse)) {
					mailCountInBoxes.inbox += box.status.messages || 0;
					continue;
				}
				if (/sent/gi.test(box.specialUse)) {
					mailCountInBoxes.sent += box.status.messages || 0;
					continue;
				}
				if (/spam|junk/gi.test(box.specialUse)) {
					mailCountInBoxes.spam += box.status.messages || 0;
					continue;
				}
				if (/trash/gi.test(box.specialUse)) {
					mailCountInBoxes.deleted += box.status.messages || 0;
					continue;
				}
			}

			return mailCountInBoxes;
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error.message);
		}
	}

	public async addFlag({
		accountId,
		email,
		mailboxPath,
		flag,
		msgIds,
	}: MailsSetFlagDTO): Promise<boolean> {
		const loggerContext = `${MailsService.name}/${this.addFlag.name}`;
		try {
			const [imap, { serviceName }] = await this.initImap(
				accountId,
				email
			);
			await imap.connect();
			const lock = await imap.getMailboxLock(
				mailboxPath in ServiceFolders[serviceName]
					? ServiceFolders[serviceName][mailboxPath]
					: mailboxPath
			);

			const msgSeqsQuery = msgIds.map(id => id.msgSeq).join(',');
			const flags = await imap.messageFlagsAdd({ seq: msgSeqsQuery }, [
				flag,
			]);

			lock.release();
			await imap.logout();

			return flags;
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error.message);
		}
	}

	public async removeFlag({
		accountId,
		email,
		mailboxPath,
		flag,
		msgIds,
	}: MailsSetFlagDTO): Promise<boolean> {
		const loggerContext = `${MailsService.name}/${this.removeFlag.name}`;
		try {
			const [imap, { serviceName }] = await this.initImap(
				accountId,
				email
			);
			await imap.connect();
			const lock = await imap.getMailboxLock(
				mailboxPath in ServiceFolders[serviceName]
					? ServiceFolders[serviceName][mailboxPath]
					: mailboxPath
			);

			const msgSeqsQuery = msgIds.map(id => id.msgSeq).join(',');

			const flags = await imap.messageFlagsRemove({ seq: msgSeqsQuery }, [
				flag,
			]);

			lock.release();
			await imap.logout();

			return flags;
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error.message);
		}
	}

	public async moveMessage({
		accountId,
		email,
		mailboxPath,
		mailboxDestinationPath,
		msgIds,
	}: MailsMoveMessageDTO): Promise<boolean> {
		const loggerContext = `${MailsService.name}/${this.moveMessage.name}`;

		try {
			const [imap, { serviceName }] = await this.initImap(
				accountId,
				email
			);
			await imap.connect();
			const lock = await imap.getMailboxLock(
				mailboxPath in ServiceFolders[serviceName]
					? ServiceFolders[serviceName][mailboxPath]
					: mailboxPath
			);

			const msgSeqsQuery = msgIds.map(id => id.msgSeq).join(',');

			let res = false;
			if (
				ServiceFolders[serviceName][mailboxPath] ===
					ServiceFolders[serviceName].deleted &&
				mailboxDestinationPath === mailboxPath
			) {
				res = await imap.messageDelete({ seq: msgSeqsQuery });
			} else {
				const treatedDestinationPath: string =
					mailboxDestinationPath in ServiceFolders[serviceName]
						? ServiceFolders[serviceName][mailboxDestinationPath]
						: mailboxDestinationPath;
				res = (await imap.messageMove(
					{ seq: msgSeqsQuery },
					treatedDestinationPath
				))
					? true
					: false;
			}

			lock.release();
			await imap.logout();
			return res;
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error.message);
		}
	}

	public async sendMail(
		{
			accountId,
			email,
			emailTo,
			subject,
			html,
			references,
			mailboxPath,
		}: SendMessasgeDTO,
		files?: Express.Multer.File[]
	): Promise<boolean> {
		const loggerContext = `${MailsService.name}/${this.sendMail.name}`;

		try {
			const [transporter, { serviceName }] = await this.initSmtp(
				accountId,
				email
			);

			const gottenMails: MailRDO[] = [];
			const gottenAttachments: MailRdoAttachment[] = [];

			for (const referencedMail of references) {
				const { mail: gottenMail } = await this.getMessageById(
					{ accountId, email, mailboxPath },
					referencedMail.msgSeq.toString()
				);
				if (gottenMail.msgId === referencedMail.msgId) {
					gottenMails.push(gottenMail);
					gottenAttachments.push(...gottenMail.attachments);
				}
			}

			const treatedGottenFiles = gottenAttachments.map(file => ({
				filename: file.fileName,
				content: file.content,
				contentType: file.contentType,
			}));

			const treatedMailFiles = files.map(file => ({
				filename: file.originalname,
				content: file.buffer,
				contentType: file.mimetype,
			}));

			const filesRdo: Attachment[] | undefined =
				files || treatedGottenFiles.length
					? [...treatedMailFiles, ...treatedGottenFiles]
					: undefined;

			const treatedHtml = this.adapterResendMailsHtmlRdo(
				html,
				gottenMails
			);

			const res = await transporter.sendMail({
				date: new Date(),
				from: email,
				to: emailTo,
				subject,
				bcc: email,
				html: treatedHtml,
				attachments: filesRdo,
			});

			transporter.close();

			if (serviceName !== 'Google') {
				await setTimeout(2000);

				const [imap] = await this.initImap(accountId, email);
				await imap.connect();
				const lock = await imap.getMailboxLock(
					ServiceFolders[serviceName].inbox
				);

				const foundMails = await this.imapService.getMailsByQuery(
					imap,
					{ since: dayjs().add(-1, 'd').toDate() }
				);

				const [sentMail] = foundMails.filter(
					mail => res.messageId === mail.msgId
				);
				if (sentMail) {
					await imap.messageMove(
						{ seq: `${sentMail.msgSeq}` },
						ServiceFolders[serviceName].sent
					);
				}

				lock.release();
				await imap.logout();
			}

			return true;
		} catch (error) {
			this.logger.error(error, loggerContext);
			if (
				'responseCode' in error &&
				[550, 552].includes(error.responseCode)
			) {
				ApiError.BadRequest(
					'Формат некоторых файлов запрещен на почтовом сервисе'
				);
			}
			ApiError.InternalServerError(error.message);
		}
	}
}
