import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Profile as YandexProfile, Strategy } from 'passport-yandex';
import { YandexAuthDTO } from '../dto/yandex-auth.dto';
import MailsInfo from 'src/core/consts/mailsinfo';
import ENDPOINTS from 'src/core/consts/endpoint';
const {
	MAIL_AUTH: { BASE, YANDEX },
} = ENDPOINTS;

@Injectable()
export class YandexStrategy extends PassportStrategy(
	Strategy,
	MailsInfo.Yandex.Strategy
) {
	constructor() {
		super({
			clientID: process.env.YANDEX_CLIENT_ID,
			clientSecret: process.env.YANDEX_CLIENT_SECRET,
			callbackURL: `${process.env.SERVER_URI}/${BASE}/${YANDEX.REDIRECT}`,
		});
	}

	public async validate(
		accessToken: string | null,
		refreshToken: string,
		profile: YandexProfile,
		done: (error: string | null, user: YandexAuthDTO) => void
	): Promise<void> {
		console.log('profile', profile);
		console.log('accessToken', accessToken);
		console.log('refreshToken', refreshToken);
		const {
			id,
			username,
			displayName,
			emails: [{ value: email }],
			photos: [{ value: photo }],
		} = profile;

		const yandexUser: YandexAuthDTO = {
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
