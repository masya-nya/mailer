import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { Logger } from 'src/core/logger/Logger';

export type SmtpTransporterType = Transporter<SMTPTransport.SentMessageInfo>;

@Injectable()
export class SmtpService {
	constructor(
		private readonly logger: Logger
	) {}

	public create(
		email: string,
		smtpHost: string,
		accessToken: string
	): SmtpTransporterType {
		const loggerContext = `${SmtpService.name}/${this.create.name}`;

		try {
			return createTransport({
				host: smtpHost,
				port: 465,
				secure: true,
				auth: {
					type: 'OAuth2',
					user: email,
					accessToken: accessToken,
				},
			});
		} catch (error) {
			this.logger.error(error, loggerContext);
			ApiError.InternalServerError(error.message);
		}
	}
}
