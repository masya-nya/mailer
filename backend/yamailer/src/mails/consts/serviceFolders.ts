export const ServiceFolders = {
    Yandex: {
        inbox: 'INBOX',
        sent: 'Sent',
        deleted: 'Trash',
        spam: 'Spam',
        attachments: 'INBOX',
        unread: 'INBOX',
        important: 'INBOX',
    },
    Google: {
        inbox: 'INBOX',
        sent: '[Gmail]/Отправленные',
        deleted: '[Gmail]/Корзина',
        spam: '[Gmail]/Спам',
        attachments: 'INBOX',
        unread: 'INBOX',
        important: 'INBOX',
    },
    Mailru: {
        inbox: 'INBOX',
        sent: 'Отправленные',
        deleted: 'Корзина',
        spam: 'Спам',
        attachments: 'INBOX',
        unread: 'INBOX',
        important: 'INBOX',
    },
} as const;
