import { Endpoints } from './../../consts/endpoints';

export const GoogleOptions = {
    callbackURL: `${process.env.SERVER_URI}/${Endpoints.Global}/${Endpoints.MailAuth.Root}/${Endpoints.MailAuth.Google.Redirect}`,
    scope: [
        'email',
        'profile',
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/gmail.modify',
        'https://www.googleapis.com/auth/gmail.compose',
        'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
        'https://www.googleapis.com/auth/gmail.addons.current.message.action',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.labels',
    ],
};

export const QueryConfig = {
    accessType: 'offline',
};
