import { Endpoints } from 'src/consts/endpoints';

export const YandexOptions = {
    callbackURL: `${process.env.SERVER_URI}/${Endpoints.Global}/${Endpoints.MailAuth.Root}/${Endpoints.MailAuth.Yandex.Redirect}`,
};
