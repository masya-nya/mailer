import { AddressObject } from 'mailparser';

export type Attachment = {
    content?: string;
    fileName: string;
    contentType?: string;
};

export type MailRDO = {
    subject: string | null;
    date: number;
    msgSeq: number;
    msgId: string;
    html: string;
    text: string;
    from: AddressObject;
    to: AddressObject | AddressObject[];
    attachments: Attachment[];
    flags: string[];
    marks: string[];
};

export type GetMailsPageRDO = {
    infoMsg: string;
    mailsCount: number;
    page: number;
    limit: number;
    mails: MailRDO[];
};

export type GetMailRDO = {
    mail: MailRDO;
};

export type MailCountInBoxesRdo = {
    inbox: number;
    sent: number;
    spam: number;
    deleted: number;
    attachments: number;
};
