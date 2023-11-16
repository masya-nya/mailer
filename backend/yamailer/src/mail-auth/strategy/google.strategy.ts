import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { GoogleProfileTypes } from '../types/google-profile.types';
import { GoogleAuthDto } from '../dto/google-auth.dto';
import { GoogleOptions } from '../options/google.options';
import MailsInfo from 'src/consts/mailsInfo';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, MailsInfo.Google.Strategy) {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            ...GoogleOptions,
        });
    }

    public async validate(
        accessToken: string | null,
        refreshToken: string,
        profile: GoogleProfileTypes,
        done: VerifyCallback
    ): Promise<void> {
        const {
            id,
            name: { givenName: firstName, familyName: lastName },
            emails: [{ value: email }],
            photos: [{ value: photo }],
        } = profile;

        const googleUser: GoogleAuthDto = {
            id,
            email,
            firstName,
            lastName,
            photo,
            accessToken,
            refreshToken,
        };

        done(null, googleUser);
    }
}
