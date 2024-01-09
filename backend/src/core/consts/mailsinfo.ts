const MailsInfo = {
	Google: {
		Strategy: 'google',
		Service: 'Google',
		ImapHost: 'imap.gmail.com',
		SmtpHost: 'smtp.gmail.com',
		Delimiter: '/',
	},
	Yandex: {
		Strategy: 'yandex',
		Service: 'Yandex',
		ImapHost: 'imap.yandex.ru',
		SmtpHost: 'smtp.yandex.ru',
		Delimiter: '|',
	},
	Mailru: {
		Strategy: 'mailru',
		Service: 'Mailru',
		ImapHost: 'imap.mail.ru',
		SmtpHost: 'smtp.mail.ru',
		Delimiter: '/',
	},
} as const;

export default MailsInfo;
