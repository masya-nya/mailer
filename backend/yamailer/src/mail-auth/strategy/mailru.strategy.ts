import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-mailru-email';
import { MailruProfileTypes } from '../types/mailru-profile.types';
import { MailruAuthDto } from '../dto/mailru-auth.dto';
import { MailruOptions } from '../options/mailru.options';
import { randomBytes } from 'crypto';
import MailsInfo from 'src/consts/mailsInfo';

@Injectable()
export class MailruStrategy extends PassportStrategy(Strategy, MailsInfo.Mailru.Strategy) {
    constructor() {
        super({
            clientID: process.env.MAILRU_CLIENT_ID,
            clientSecret: process.env.MAILRU_CLIENT_SECRET,
            state: randomBytes(32).toString('hex'),
            ...MailruOptions,
        });
    }

    public async validate(
        accessToken: string | null,
        refreshToken: string,
        profile: MailruProfileTypes,
        done: (error: string | null, user: MailruAuthDto) => void
    ): Promise<void> {
        const {
            id,
            name: { givenName: firstName, familyName: lastName, middleName: middleName },
            emails: [{ value: email }],
            photos: [{ value: photo }],
            username,
        } = profile;

        const mailruUser: MailruAuthDto = {
            id,
            username,
            firstName,
            lastName,
            middleName,
            email,
            photo,
            accessToken,
            refreshToken,
        };

        done(null, mailruUser);
    }
}
