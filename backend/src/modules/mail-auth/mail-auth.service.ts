import { Injectable } from '@nestjs/common';
import { YandexAuthDTO } from './dto/yandex-auth.dto';
import { Logger } from 'src/core/logger/Logger';
// import MailsInfo from 'src/core/consts/mailsinfo';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { EmailService } from '../email/email.service';
import MailsInfo from 'src/core/consts/mailsinfo';
import { EmailDocument } from '../email/models/email.model';
import { Types } from 'mongoose';
import { GoogleAuthDTO } from './dto/google-auth.dto';

@Injectable()
export class MailAuthService {
	constructor(
		private readonly emailService: EmailService,
		private readonly logger: Logger
	) {}

	public async yandexAuthRedirect(
		yandexUser: YandexAuthDTO,
		accountId: Types.ObjectId
	): Promise<EmailDocument> {
		try {
			if (!yandexUser) {
				ApiError.InternalServerError(
					'Не удалось получить пользтователя от YANDEX'
				);
			}

			const newEmailInstance = await this.emailService.createEmail({
				accountId,
				email: yandexUser.email,
				emailUserId: yandexUser.id,
				serviceName: MailsInfo.Yandex.Service,
				photo: yandexUser.photo,
				accessToken: yandexUser.accessToken,
				refreshToken: yandexUser.refreshToken,
			});
			return newEmailInstance;
		} catch (error) {
			this.logger.error(error);
			ApiError.InternalServerError(error.message);
		}
	}

	public async googleAuthRedirect(
		googleUser: GoogleAuthDTO,
		accountId: Types.ObjectId
	): Promise<EmailDocument> {
		try {
			if (!googleUser) {
				ApiError.InternalServerError(
					'Не удалось получить пользтователя от GOOGLE'
				);
			}

			const newEmailInstance = await this.emailService.createEmail({
				accountId,
				email: googleUser.email,
				emailUserId: googleUser.id,
				serviceName: MailsInfo.Google.Service,
				photo: googleUser.photo,
				accessToken: googleUser.accessToken,
				refreshToken: googleUser.refreshToken,
			});
			return newEmailInstance;
		} catch (error) {
			this.logger.error(error);
			ApiError.InternalServerError(error.message);
		}
	}

	public usedMailInfo(redirectUri: string): string {
		return `Эта почта уже подключена к другому аккаунту/менеджеру или является корпоративной. 
			Прежде чем подключить почту к этому аккаунту/менеджеру, отключите ее в другом аккаунте/менеджере. 
			<a href='${decodeURI(redirectUri)}'>Вернуться в amoCRM<a/>`;
	}
}
