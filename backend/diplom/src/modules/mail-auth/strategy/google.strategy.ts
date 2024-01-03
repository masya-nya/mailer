import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { GoogleProfileTypes } from '../types/google-profile.types';
import MailsInfo from 'src/core/consts/mailsinfo';
import ENDPOINTS from 'src/core/consts/endpoint';
import { GoogleAuthDTO } from '../dto/google-auth.dto';
const {
	MAIL_AUTH: { BASE, GOOGLE },
} = ENDPOINTS;

@Injectable()
export class GoogleStrategy extends PassportStrategy(
	Strategy,
	MailsInfo.Google.Strategy
) {
	constructor() {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: `${process.env.SERVER_URI}/${BASE}/${GOOGLE.REDIRECT}`,
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

		const googleUser: GoogleAuthDTO = {
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
