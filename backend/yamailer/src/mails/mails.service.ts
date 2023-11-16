import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import MailsInfo from 'src/consts/mailsInfo';
import { ImapConnectionType, ImapService } from 'src/imap/imap.service';
import { MailerService } from 'src/mailers/mailer.service';
import { MarlboroService } from 'src/marlboroLogger/marlboro.service';
import handleError from 'src/utils/handleError';
import { MailsGetMessageDto } from './dto/mails-getMessage.dto';
import { GetMailRDO, GetMailsPageRDO, MailCountInBoxesRdo, MailRDO } from './types/mails.rdo';
import { MailerDocument } from 'src/mailers/mailer.model';
import { ServiceFolders } from './consts/serviceFolders';
import { MailsSetFlagDto } from './dto/mails-setFlag.dto';
import { MailsGetDto } from './dto/mails-getCounts.dto';
import { MailsGetDatePagesDto } from './dto/mails-getDatePage.dto';
import { MailsMoveMessageDto } from './dto/mails-moveMessage.dto';
import { MailsSendMessageDto } from './dto/mail-sendMessage.dto';
import { SmtpService, SmtpTransporterType } from 'src/smtp/smtp.service';
import { MarkMailsService } from 'src/marking-mail/mark-mails.service';
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_SECOND } from 'src/consts/milliseconds';
import { Attachment } from 'nodemailer/lib/mailer';
import { Attachment as MailRdoAttachment } from './types/mails.rdo';
import { setTimeout } from 'node:timers/promises';
import * as dayjs from 'dayjs';
import { SmtpErrors } from 'src/smtp/consts/errorCodes';

@Injectable()
export class MailsService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly markMailsService: MarkMailsService,
        private readonly imapService: ImapService,
        private readonly smtpService: SmtpService,
        private readonly logger: MarlboroService
    ) {}

    public async initImap(accountId: number, managerId: number, email: string): Promise<[ImapConnectionType, MailerDocument]> {
        const loggerContext = `${MailsService.name}/${this.initImap.name}`;

        try {
            const mailer = await this.mailerService.getByEmail({ accountId, email, managerId });
            if (!mailer) {
                throw new HttpException('This email does not exist in user with this accountId and managerId', HttpStatus.NOT_FOUND);
            }

            const imap = await this.imapService.create(mailer.email, MailsInfo[mailer.serviceName].ImapHost, mailer.accessToken);

            return [imap, mailer];
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async initSmtp(accountId: number, managerId: number, email: string): Promise<[SmtpTransporterType, MailerDocument]> {
        const loggerContext = `${MailsService.name}/${this.initSmtp.name}`;

        try {
            const mailer = await this.mailerService.getByEmail({ accountId, email, managerId });
            if (!mailer) {
                throw new HttpException('This email does not exist in user with this accountId and managerId', HttpStatus.NOT_FOUND);
            }

            const transporter = this.smtpService.create(mailer.email, MailsInfo[mailer.serviceName].SmtpHost, mailer.accessToken);

            return [transporter, mailer];
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    private adapterMailsRdo(page: number, limit: number, startFetching: number, mails: MailRDO[] = [], totalCount = 0): GetMailsPageRDO {
        return {
            infoMsg: `Вы получили ${mails.length} писем, за ${(Date.now() - startFetching) / MILLISECONDS_IN_SECOND} sec`,
            mailsCount: totalCount,
            page,
            limit,
            mails: mails,
        };
    }

    private adapterResendMailsHtmlRdo(mailHtml: string, referencedMails: MailRDO[]): string {
        const treatedReferencesHtml = referencedMails
            .map((mail) => {
                return `<div>
                    <div>
                        ---------- Пересланное сообщение ----------
                        <br>
                        <strong>
                            \"${mail.from.value[0].name}\" &#60;${mail.from.value[0].address}&#62;:
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

    public async getPageByDateAndQuery({
        accountId,
        managerId,
        email,
        limit,
        page,
        dateFrom,
        dateTo,
        mailboxPath,
        markId,
        filterQuery,
        filterQueryValue,
    }: MailsGetDatePagesDto): Promise<GetMailsPageRDO> {
        const loggerContext = `${MailsService.name}/${this.getPageByDateAndQuery.name}`;
        const [imapConnection, { serviceName }] = await this.initImap(accountId, managerId, email);

        try {
            const startFetching = Date.now();

            imapConnection.mailboxLock = await imapConnection.imap.getMailboxLock(
                mailboxPath in ServiceFolders[serviceName] ? ServiceFolders[serviceName][mailboxPath] : mailboxPath
            );

            const dateRange: { since?: Date | string; before?: Date | string } = {};
            if (serviceName !== MailsInfo.Mailru.Service) {
                dateRange.since = dateFrom || new Date(0);
                dateRange.before = dateTo || new Date(Date.now() + MILLISECONDS_IN_DAY);
            }

            if (!markId) {
                const foundMails = await this.imapService.querySearchMails(imapConnection.imap, {
                    ...dateRange,
                    [filterQuery]: filterQueryValue,
                });

                const foundMailsCount = foundMails.length;

                if (!foundMailsCount) {
                    imapConnection.mailboxLock.release();
                    return this.adapterMailsRdo(page, limit, startFetching);
                }

                const isWrongPage = foundMailsCount - limit * (page - 1) < 0;
                if (page > 1 && isWrongPage) {
                    throw new HttpException('Wrong page number', HttpStatus.BAD_REQUEST);
                }

                const mailsDiff = foundMailsCount - limit * page;
                const startPage = mailsDiff >= 0 ? mailsDiff : 0;
                const endPage = mailsDiff >= 0 ? startPage + limit : mailsDiff + limit;
                const msgsQuery = foundMails.slice(startPage, endPage).join(',');

                const mails = await this.imapService.getMailsByQuery(imapConnection.imap, {
                    seq: msgsQuery,
                    [filterQuery]: filterQueryValue,
                });

                for (const mail of mails) {
                    const markedMail = await this.markMailsService.getMarkedMail(email, mail.msgId);
                    if (markedMail && markedMail.msgSeq !== mail.msgSeq) {
                        this.markMailsService.updateMarkedMailSeq(email, mail.msgId, mail.msgSeq);
                    }
                    mail.marks = markedMail?.markIds || [];
                }

                imapConnection.mailboxLock.release();
                return this.adapterMailsRdo(page, limit, startFetching, mails, foundMailsCount);
            }

            const markedMailIds = await this.markMailsService.getMailsByMarkId(email, markId);
            if (!markedMailIds.length) {
                imapConnection.mailboxLock.release();
                return this.adapterMailsRdo(page, limit, startFetching);
            }

            const markedMailSeqsQuery = markedMailIds.map((mail) => mail.msgSeq).join(',');
            const foundMails = await this.imapService.getMailsByQuery(imapConnection.imap, {
                seq: markedMailSeqsQuery,
                ...dateRange,
                [filterQuery]: filterQueryValue,
            });

            const mails: MailRDO[] = foundMails.filter((mail) => markedMailIds.some((id) => id.msgId === mail.msgId));

            const mailsCount = mails.length;

            if (!mailsCount) {
                imapConnection.mailboxLock.release();
                return this.adapterMailsRdo(page, limit, startFetching);
            }

            const isWrongPage = mailsCount - limit * (page - 1) < 0;
            if (page > 1 && isWrongPage) {
                throw new HttpException('Wrong page number', HttpStatus.BAD_REQUEST);
            }

            const mailsDiff = mailsCount - limit * page;
            const startPage = mailsDiff >= 0 ? mailsDiff : 0;
            const endPage = mailsDiff >= 0 ? startPage + limit : mailsDiff + limit;

            const treatedMails = mails.slice(startPage, endPage);

            for (const mail of treatedMails) {
                const markedMail = await this.markMailsService.getMarkedMail(email, mail.msgId);
                if (markedMail && markedMail.msgSeq !== mail.msgSeq) {
                    this.markMailsService.updateMarkedMailSeq(email, mail.msgId, mail.msgSeq);
                }
                mail.marks = markedMail?.markIds || [];
            }

            imapConnection.mailboxLock.release();
            return this.adapterMailsRdo(page, limit, startFetching, treatedMails, mailsCount);
        } catch (error) {
            imapConnection.mailboxLock.release();
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getMessageById({ accountId, managerId, email, mailboxPath }: MailsGetMessageDto, msgId: string): Promise<GetMailRDO> {
        const loggerContext = `${MailsService.name}/${this.getMessageById.name}`;
        const [imapConnection, { serviceName }] = await this.initImap(accountId, managerId, email);

        try {
            imapConnection.mailboxLock = await imapConnection.imap.getMailboxLock(
                mailboxPath in ServiceFolders[serviceName] ? ServiceFolders[serviceName][mailboxPath] : mailboxPath
            );

            const mail = await this.imapService.getOneMail(imapConnection.imap, msgId);

            const markedMail = await this.markMailsService.getMarkedMail(email, mail.msgId);
            if (markedMail && markedMail.msgSeq !== mail.msgSeq) {
                this.markMailsService.updateMarkedMailSeq(email, mail.msgId, mail.msgSeq);
            }
            mail.marks = markedMail?.markIds || [];

            imapConnection.mailboxLock.release();
            return {
                mail: mail,
            };
        } catch (error) {
            imapConnection.mailboxLock.release();
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getMailCountInBoxes({ accountId, managerId, email }: MailsGetDto): Promise<MailCountInBoxesRdo> {
        const loggerContext = `${MailsService.name}/${this.getMailCountInBoxes.name}`;

        try {
            const [imapConnection] = await this.initImap(accountId, managerId, email);

            const boxes = await imapConnection.imap.list({ statusQuery: { messages: true, unseen: true } });

            const mailCountInBoxes: MailCountInBoxesRdo = {
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
            handleError(error);
        }
    }

    public async getUnseenCount({ accountId, managerId, email }: MailsGetDto): Promise<number> {
        const loggerContext = `${MailsService.name}/${this.getUnseenCount.name}`;

        try {
            const [imapConnection, { serviceName }] = await this.initImap(accountId, managerId, email);
            const { unseen } = await this.imapService.mailBoxStatus(imapConnection.imap, ServiceFolders[serviceName].inbox);

            return unseen || 0;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getImportantCount({ accountId, managerId, email }: MailsGetDto): Promise<number> {
        const loggerContext = `${MailsService.name}/${this.getImportantCount.name}`;
        const [imapConnection, { serviceName }] = await this.initImap(accountId, managerId, email);

        try {
            imapConnection.mailboxLock = await imapConnection.imap.getMailboxLock(ServiceFolders[serviceName].inbox);

            const important = await this.imapService.querySearchMails(imapConnection.imap, { flagged: true });

            imapConnection.mailboxLock.release();
            return important.length;
        } catch (error) {
            imapConnection.mailboxLock.release();
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async addFlag({ accountId, email, managerId, mailboxPath, flag, msgIds }: MailsSetFlagDto): Promise<boolean> {
        const loggerContext = `${MailsService.name}/${this.addFlag.name}`;
        const [imapConnection, { serviceName }] = await this.initImap(accountId, managerId, email);

        try {
            imapConnection.mailboxLock = await imapConnection.imap.getMailboxLock(
                mailboxPath in ServiceFolders[serviceName] ? ServiceFolders[serviceName][mailboxPath] : mailboxPath
            );

            const msgSeqsQuery = msgIds.map((id) => id.msgSeq).join(',');
            const flags = await imapConnection.imap.messageFlagsAdd({ seq: msgSeqsQuery }, [flag]);

            imapConnection.mailboxLock.release();
            return flags;
        } catch (error) {
            imapConnection.mailboxLock.release();
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async removeFlag({ accountId, email, managerId, mailboxPath, flag, msgIds }: MailsSetFlagDto): Promise<boolean> {
        const loggerContext = `${MailsService.name}/${this.removeFlag.name}`;
        const [imapConnection, { serviceName }] = await this.initImap(accountId, managerId, email);

        try {
            imapConnection.mailboxLock = await imapConnection.imap.getMailboxLock(
                mailboxPath in ServiceFolders[serviceName] ? ServiceFolders[serviceName][mailboxPath] : mailboxPath
            );

            const msgSeqsQuery = msgIds.map((id) => id.msgSeq).join(',');

            const flags = await imapConnection.imap.messageFlagsRemove({ seq: msgSeqsQuery }, [flag]);

            imapConnection.mailboxLock.release();
            return flags;
        } catch (error) {
            imapConnection.mailboxLock.release();
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async moveMessage({
        accountId,
        email,
        managerId,
        mailboxPath,
        mailboxDestinationPath,
        msgIds,
    }: MailsMoveMessageDto): Promise<boolean> {
        const loggerContext = `${MailsService.name}/${this.moveMessage.name}`;
        const [imapConnection, { serviceName }] = await this.initImap(accountId, managerId, email);

        try {
            imapConnection.mailboxLock = await imapConnection.imap.getMailboxLock(
                mailboxPath in ServiceFolders[serviceName] ? ServiceFolders[serviceName][mailboxPath] : mailboxPath
            );

            const msgSeqsQuery = msgIds.map((id) => id.msgSeq).join(',');

            let res = false;
            if (
                ServiceFolders[serviceName][mailboxPath] === ServiceFolders[serviceName].deleted &&
                mailboxDestinationPath === mailboxPath
            ) {
                res = await imapConnection.imap.messageDelete({ seq: msgSeqsQuery });
            } else {
                const treatedDestinationPath: string =
                    mailboxDestinationPath in ServiceFolders[serviceName]
                        ? ServiceFolders[serviceName][mailboxDestinationPath]
                        : mailboxDestinationPath;
                res = (await imapConnection.imap.messageMove({ seq: msgSeqsQuery }, treatedDestinationPath)) ? true : false;
            }

            imapConnection.mailboxLock.release();
            return res;
        } catch (error) {
            imapConnection.mailboxLock.release();
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async sendMail(
        { accountId, managerId, email, emailTo, subject, html, references, mailboxPath }: MailsSendMessageDto,
        files?: Express.Multer.File[]
    ): Promise<boolean> {
        const loggerContext = `${MailsService.name}/${this.sendMail.name}`;

        try {
            const [transporter, { serviceName }] = await this.initSmtp(accountId, managerId, email);

            const gottenMails: MailRDO[] = [];
            const gottenAttachments: MailRdoAttachment[] = [];

            for (const referencedMail of references) {
                const { mail: gottenMail } = await this.getMessageById(
                    { accountId, managerId, email, mailboxPath },
                    referencedMail.msgSeq.toString()
                );
                if (gottenMail.msgId === referencedMail.msgId) {
                    gottenMails.push(gottenMail);
                    gottenAttachments.push(...gottenMail.attachments);
                }
            }

            const treatedGottenFiles = gottenAttachments.map((file) => ({
                filename: file.fileName,
                content: file.content,
                contentType: file.contentType,
            }));

            const treatedMailFiles = files.map((file) => ({
                filename: file.originalname,
                content: file.buffer,
                contentType: file.mimetype,
            }));

            const filesRdo: Attachment[] | undefined =
                files || treatedGottenFiles.length ? [...treatedMailFiles, ...treatedGottenFiles] : undefined;

            const treatedHtml = this.adapterResendMailsHtmlRdo(html, gottenMails);

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

                const [imapConnection, { serviceName }] = await this.initImap(accountId, managerId, email);
                imapConnection.mailboxLock = await imapConnection.imap.getMailboxLock(ServiceFolders[serviceName].inbox);

                const foundMails = await this.imapService.getMailsByQuery(imapConnection.imap, { since: dayjs().add(-1, 'd').toDate() });

                const [sentMail] = foundMails.filter((mail) => res.messageId === mail.msgId);
                if (sentMail) {
                    await imapConnection.imap.messageMove({ seq: `${sentMail.msgSeq}` }, ServiceFolders[serviceName].sent);
                }

                imapConnection.mailboxLock.release();
            }

            return true;
        } catch (error) {
            this.logger.error(error, loggerContext);
            if ('responseCode' in error && SmtpErrors.includes(error.responseCode)) {
                throw new HttpException('Формат некоторых файлов запрещен на почтовом сервисе', HttpStatus.BAD_REQUEST);
            }
            handleError(error);
        }
    }
}
