import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Profile as YandexProfile, Strategy } from 'passport-yandex';
import { YandexOptions } from '../options/yandex.options';
import { YandexAuthDto } from '../dto/yandex-auth.dto';
import MailsInfo from 'src/consts/mailsInfo';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, MailsInfo.Yandex.Strategy) {
    constructor() {
        super({
            clientID: process.env.YANDEX_CLIENT_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET,
            ...YandexOptions,
        });
    }

    public async validate(
        accessToken: string | null,
        refreshToken: string,
        profile: YandexProfile,
        done: (error: string | null, user: YandexAuthDto) => void
    ): Promise<void> {
        const {
            id,
            username,
            displayName,
            emails: [{ value: email }],
            photos: [{ value: photo }],
        } = profile;

        const yandexUser: YandexAuthDto = {
            id,
            email,
            username,
            photo,
            displayName,
            accessToken,
            refreshToken,
        };

        done(null, yandexUser);
    }
}
