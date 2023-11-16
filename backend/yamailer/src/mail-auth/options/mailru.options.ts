import { Endpoints } from 'src/consts/endpoints';

export const MailruOptions = {
    callbackURL: `${process.env.SERVER_URI}/${Endpoints.Global}/${Endpoints.MailAuth.Root}/${Endpoints.MailAuth.Mailru.Redirect}`,
    scope: ['userinfo', 'mail.imap'],
};
