export type AttachmentT = {
	content: string;
	fileName: string;
};

export type FromToT = {
	value: Record<'name' | 'address', string>[];
	html: string;
	text: string;
}

export type MailT = {
    subject: string | null;
    date: number;
    msgSeq: number;
    msgId: string;
    html: string | false;
    text: string;
    marks: string[];
    from: FromToT;
    to: FromToT;
    flags: string[];
    attachments: AttachmentT[];
    checked: boolean;
};

export type ServerMailT = {
    subject: string;
    date: number;
    msgSeq: number;
    msgId: string;
    html: string;
    text: string;
    from: FromToT;
    to: FromToT;
    flags: string[];
    marks: string[];
    attachments: AttachmentT[];
};

export type mailsPageT = {
    infoMsg: string;
    mailsCount: number;
    page: number;
    limit: number;
    mails: ServerMailT[];
};

export type SelectedMailT = {
    msgId: string
    msgSeq: number
}