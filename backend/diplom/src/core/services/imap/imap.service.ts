import { Injectable } from '@nestjs/common';
import {
	FetchQueryObject,
	ImapFlow,
	SearchObject,
	StatusObject,
} from 'imapflow';
import { simpleParser } from 'mailparser';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { Logger } from 'src/core/logger/Logger';
import { MailRDO } from 'src/modules/mails/types/mails.rdo';

@Injectable()
export class ImapService {
	constructor(
		private readonly logger: Logger
	) {}

	public create(
		email: string,
		imapHost: string,
		accessToken: string
	): ImapFlow {
		console.log({ email, imapHost, accessToken });
		try {
			return new ImapFlow({
				auth: {
					user: email,
					accessToken: accessToken,
				},
				host: imapHost,
				secure: true,
				port: 993,
				logger: false,
			});
		} catch (error) {
			this.logger.error(error);
			ApiError.InternalServerError(error);
		}
	}

	public async getMailsByQuery(
		imap: ImapFlow,
		queryObject: SearchObject,
		requestOptions: FetchQueryObject = {
			source: true,
			flags: true,
		}
	): Promise<MailRDO[]> {
		const loggerContext = `${ImapService.name}/${this.getMailsByQuery.name}`;

		try {
			const resMails: MailRDO[] = [];
			for await (const msg of imap.fetch(queryObject, requestOptions)) {
				const parsedMail = await simpleParser(msg.source);
				resMails.push({
					subject: parsedMail.subject || null,
					date: parsedMail.date.getTime(),
					msgSeq: msg.seq,
					msgId: parsedMail.messageId,
					html: '',
					text: parsedMail.text,
					from: parsedMail.from,
					to: parsedMail.to,
					flags: Array.from(msg.flags),
					attachments: parsedMail.attachments.map(
						(attachment, i) => ({
							fileName:
								attachment.filename || `without_name(${i})`,
						})
					)
				});
			}

			return resMails.sort((a, b) => b.date - a.date);
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error);
		}
	}

	public async getOneMail(imap: ImapFlow, msgSeq: string): Promise<MailRDO> {
		const loggerContext = `${ImapService.name}/${this.getOneMail.name}`;

		try {
			const foundMail = await imap.fetchOne(msgSeq, {
				source: true,
				flags: true,
			});
			const parsedMail = await simpleParser(foundMail.source);
			const treatedAttachments = parsedMail.attachments.map(
				(attachment, i) => ({
					content: `data:${
						attachment.contentType
					};base64,${attachment.content.toString('base64')}`,
					fileName: attachment.filename || `without_name(${i})`,
					contentType: attachment.contentType,
				})
			);

			const treatedHtml = parsedMail.html
				? parsedMail.html
					.replace(/html|body/gim, 'div')
					.replace(
						/<style[>,=#;!@\/\\*'"&%:\.\-\[\]\^(){}\w\s]+<\/style>/gim,
						''
					)
				: '';

			return {
				subject: parsedMail.subject,
				date: parsedMail.date.getTime(),
				msgSeq: foundMail.seq,
				msgId: parsedMail.messageId,
				html: treatedHtml,
				text: parsedMail.text,
				from: parsedMail.from,
				to: parsedMail.to,
				flags: Array.from(foundMail.flags),
				attachments: treatedAttachments,
			};
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error);
		}
	}

	public async querySearchMails(
		imap: ImapFlow,
		queryObject: SearchObject
	): Promise<number[]> {
		const loggerContext = `${ImapService.name}/${this.querySearchMails.name}`;

		try {
			const foundMails = await imap.search(queryObject);

			return foundMails;
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error);
		}
	}

	public async mailBoxStatus(
		imap: ImapFlow,
		mailboxPath: string
	): Promise<StatusObject> {
		const loggerContext = `${ImapService.name}/${this.mailBoxStatus.name}`;

		try {
			return await imap.status(mailboxPath, {
				messages: true,
				unseen: true,
			});
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error);
		}
	}
}
