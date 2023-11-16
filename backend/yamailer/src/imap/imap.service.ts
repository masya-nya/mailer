import { Injectable } from '@nestjs/common';
import { FetchQueryObject, ImapFlow, MailboxLockObject, SearchObject, StatusObject } from 'imapflow';
import { simpleParser } from 'mailparser';
import { MailRDO } from 'src/mails/types/mails.rdo';
import { MarlboroService } from 'src/marlboroLogger/marlboro.service';
import handleError from 'src/utils/handleError';
import { setTimeout } from 'node:timers/promises';

export type ImapConnectionType = {
    imap: ImapFlow;
    mailboxLock: MailboxLockObject | null;
    isConnected: boolean;
    isConnecting: boolean;
};

export type ImapConnectionsObjectType = {
    [key in string]: ImapConnectionType;
};

const imapConnections: ImapConnectionsObjectType = {};

@Injectable()
export class ImapService {
    constructor(private readonly logger: MarlboroService) {}

    private async addImapConnection(email: string, imap: ImapFlow): Promise<void> {
        if (!(email in imapConnections)) {
            imapConnections[email] = {
                imap,
                mailboxLock: null,
                isConnected: true,
                isConnecting: true,
            };

            await imap.connect();
            imapConnections[email].isConnecting = false;
        }
    }

    public async removeImapConnection(email: string): Promise<void> {
        const connection = await this.getImapConnection(email);
        if (connection) {
            await connection.imap.logout();
            connection.isConnected = false;
            delete imapConnections[email];
        }
    }

    private async getImapConnection(email: string): Promise<ImapConnectionType | undefined> {
        if (imapConnections[email] && imapConnections[email].isConnecting) {
            while (imapConnections[email].isConnecting) {
                await setTimeout(500);
            }
            return imapConnections[email];
        } else {
            return imapConnections[email] || undefined;
        }
    }

    public getAllImapConnections(): ImapConnectionsObjectType {
        return imapConnections;
    }

    public async create(email: string, imapHost: string, accessToken: string): Promise<ImapConnectionType> {
        const loggerContext = `${ImapService.name}/${this.create.name}`;

        try {
            if (!(email in imapConnections)) {
                const imap = new ImapFlow({
                    auth: {
                        user: email,
                        accessToken: accessToken,
                    },
                    host: imapHost,
                    secure: true,
                    port: 993,
                    logger: false,
                    disableAutoIdle: true,
                });

                await this.addImapConnection(email, imap);
            }

            return await this.getImapConnection(email);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
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
                const parsedMail = await simpleParser(msg.source, {
                    skipTextToHtml: true,
                    skipImageLinks: true,
                    skipTextLinks: true,
                });
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
                    attachments: parsedMail.attachments.map((attachment, i) => ({ fileName: attachment.filename || `without_name(${i})` })),
                    marks: [],
                });
            }

            return resMails.sort((a, b) => b.date - a.date);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getOneMail(imap: ImapFlow, msgSeq: string): Promise<MailRDO> {
        const loggerContext = `${ImapService.name}/${this.getOneMail.name}`;

        try {
            const foundMail = await imap.fetchOne(msgSeq, { source: true, flags: true });
            const parsedMail = await simpleParser(foundMail.source);
            const treatedAttachments = parsedMail.attachments.map((attachment, i) => ({
                content: `data:${attachment.contentType};base64,${attachment.content.toString('base64')}`,
                fileName: attachment.filename || `without_name(${i})`,
                contentType: attachment.contentType,
            }));

            const treatedHtml = parsedMail.html
                ? parsedMail.html.replace(/html|body/gim, 'div').replace(/<style[>,=#;!@\/\\*'"&%:\.\-\[\]\^(){}\w\s]+<\/style>/gim, '')
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
                marks: [],
            };
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async querySearchMails(imap: ImapFlow, queryObject: SearchObject): Promise<number[]> {
        const loggerContext = `${ImapService.name}/${this.querySearchMails.name}`;

        try {
            const foundMails = await imap.search(queryObject);

            return foundMails;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async mailBoxStatus(imap: ImapFlow, mailboxPath: string): Promise<StatusObject> {
        const loggerContext = `${ImapService.name}/${this.mailBoxStatus.name}`;

        try {
            return await imap.status(mailboxPath, {
                messages: true,
                unseen: true,
            });
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
