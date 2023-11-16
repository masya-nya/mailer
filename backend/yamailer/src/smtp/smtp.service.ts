import { Injectable } from '@nestjs/common';
import { MarlboroService } from 'src/marlboroLogger/marlboro.service';
import handleError from 'src/utils/handleError';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type SmtpTransporterType = Transporter<SMTPTransport.SentMessageInfo>;

@Injectable()
export class SmtpService {
    constructor(private readonly logger: MarlboroService) {}

    public create(email: string, smtpHost: string, accessToken: string): SmtpTransporterType {
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
            handleError(error);
        }
    }
}
