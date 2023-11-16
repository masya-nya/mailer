export const Endpoints = {
    Global: 'yamailer',
    Runtime: {
        Ping: '/ping',
    },
    WidgetUser: {
        Install: '/install',
        UnInstall: '/uninstall',
    },
    MailAuth: {
        Root: 'mail-auth',
        Google: {
            Auth: 'google-auth',
            Redirect: 'google-redirect',
        },
        Yandex: {
            Auth: 'yandex-auth',
            Redirect: 'yandex-redirect',
        },
        Mailru: {
            Auth: 'mailru-auth',
            Redirect: 'mailru-redirect',
        },
    },
    MailService: {
        Mark: 'mark',
        FolderImap: 'folder-imap',
        Emails: 'emails',
        Mails: {
            Root: 'mail',
            GetByDate: 'by-date',
            MailCountInBoxes: 'count-in-boxes',
            UnseenCount: 'unseen-count',
            ImportantCount: 'important-count',
            AddFlag: 'add-flag',
            RemoveFlag: 'remove-flag',
            MoveToFolder: 'move-message',
            MarkMail: 'mark-mail',
            UnMarkMail: 'unmark-mail',
        },
        AmoEntity: {
            Root: 'amo-entity',
            Leads: 'leads',
            Customers: 'customers',
            Contacts: 'contacts',
        },
    },
} as const;
