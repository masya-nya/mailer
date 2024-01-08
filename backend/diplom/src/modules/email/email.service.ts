import { Injectable } from '@nestjs/common';
import { Logger } from 'src/core/logger/Logger';
import { EmailRepository } from './email.repository';
import { CreateEmailDTO } from './DTO/create-email.dto';
import { Email, EmailDocument } from './models/email.model';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { ModelWithId } from 'src/core/types';
import axios from 'axios';
import {
	GoogleTokenResponse,
	YandexTokenResponse,
} from './types/UpdateTokenResponse';
import { Types } from 'mongoose';
import MailsInfo from 'src/core/consts/mailsinfo';

@Injectable()
export class EmailService {
	readonly serviceName = 'EmailRepository';

	constructor(
		private readonly logger: Logger,
		private readonly emailRepository: EmailRepository
	) {}

	public async updateToken(
		accountId: Types.ObjectId,
		emailDocument: EmailDocument
	): Promise<string> {
		const loggerContext = `${EmailService.name}/${this.updateToken.name}`;

		try {
			switch (emailDocument.serviceName) {
				case MailsInfo.Google.Service:
					return await this.updateGoogleToken(
						accountId,
						emailDocument
					);
				case MailsInfo.Yandex.Service:
					return await this.updateYandexToken(
						accountId,
						emailDocument
					);
			}
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error.message);
		}
	}

	private async updateYandexToken(
		accountId: Types.ObjectId,
		emailDocument: EmailDocument
	): Promise<string> {
		this.logger.info('Попытка обновления токена Yandex');
		try {
			const { data: newToken } = await axios.post<YandexTokenResponse>(
				'https://oauth.yandex.ru/token',
				{
					client_id: process.env.YANDEX_CLIENT_ID,
					client_secret: process.env.YANDEX_CLIENT_SECRET,
					grant_type: 'refresh_token',
					refresh_token: emailDocument.refreshToken,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			);
			if (!newToken) {
				ApiError.Unauthorized('Error updating token to yandex');
			}

			await this.emailRepository.updateEmail(
				{ accountId, email: emailDocument.email },
				{
					accessToken: newToken.access_token,
					refreshToken: newToken.refresh_token,
				}
			);
			this.logger.log('Токен Yandex был обновлен и добален в БД');
			return newToken.access_token;
		} catch (error) {
			this.logger.error(error);
			ApiError.InternalServerError(error.message);
		}
	}

	private async updateGoogleToken(
		accountId: Types.ObjectId,
		emailDocument: EmailDocument
	): Promise<string> {
		const loggerContext = `${EmailService.name}/${this.updateGoogleToken.name}`;
		this.logger.info('Попытка обновления токена Google');

		try {
			const { data: newToken } = await axios.post<GoogleTokenResponse>(
				'https://oauth2.googleapis.com/token',
				{
					client_id: process.env.GOOGLE_CLIENT_ID,
					client_secret: process.env.GOOGLE_CLIENT_SECRET,
					grant_type: 'refresh_token',
					refresh_token: emailDocument.refreshToken,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			);

			if (!newToken) {
				ApiError.Unauthorized();
			}

			await this.emailRepository.updateEmail(
				{ accountId, email: emailDocument.email },
				{
					accessToken: newToken.access_token,
					refreshToken: newToken.refresh_token,
				}
			);
			this.logger.log('Токен Google был обновлен и добален в БД');
			return newToken.access_token;
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error.message);
		}
	}

	async checkYandexTokenValidity(accessToken: string): Promise<boolean> {
		const yandexUserInfoEndpoint = 'https://login.yandex.ru/info';

		try {
			await axios.get(yandexUserInfoEndpoint, {
				headers: {
					Authorization: `OAuth ${accessToken}`,
				},
			});
			this.logger.log('Проверка валидности токена Yandex прошла успешно');

			return true;
		} catch (error) {
			console.error(
				'Ошибка проверки валидности токена Яндекса:',
				error.response.data.error || error.message
			);
			return false;
		}
	}

	async checkGoogleTokenValidity(accessToken: string): Promise<boolean> {
		try {
			const response = await axios.post(
				'https://www.googleapis.com/oauth2/v1/tokeninfo',
				{
					access_token: accessToken,
				}
			);

			const tokenInfo = response.data;


			if (
				!tokenInfo.aud ||
				tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID
			) {
				throw new Error('Неверный идентификатор клиента Google');
			}

			return true;
		} catch (error) {
			console.error(
				'Ошибка при проверке OAuth токена Google:',
				error.message
			);
			return false;
		}
	}

	async createEmail(createEmailDTO: CreateEmailDTO): Promise<EmailDocument> {
		const { email } = createEmailDTO;
		const emailDB = await this.emailRepository.find({ email });
		if (emailDB) {
			this.logger.error(
				`Такой email уже был добавлен с другом аккаунте (${email})`
			);
			throw ApiError.BadRequest('Такой emailуже подключен');
		}
		const newEmail = await this.emailRepository.createEmail(createEmailDTO);
		this.logger.log(`Email был добавлен (${email})`);

		return newEmail;
	}

	async find(findDTO: Partial<ModelWithId<Email>>): Promise<EmailDocument> {
		const email = await this.emailRepository.find({ ...findDTO });
		return email;
	}

	async findAll(
		findDTO: Partial<ModelWithId<Email>>
	): Promise<EmailDocument[]> {
		const email = await this.emailRepository.findAll({ ...findDTO });
		return email;
	}
}
