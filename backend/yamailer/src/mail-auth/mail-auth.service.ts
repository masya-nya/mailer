import { Injectable } from '@nestjs/common';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { MailerService } from './../mailers/mailer.service';
import { MarlboroService } from 'src/marlboroLogger/marlboro.service';
import handleError from './../utils/handleError';
import { YandexAuthDto } from './dto/yandex-auth.dto';
import { MailruAuthDto } from './dto/mailru-auth.dto';
import MailsInfo from 'src/consts/mailsInfo';
import { MailerDocument } from 'src/mailers/mailer.model';

@Injectable()
export class MailAuthService {
    constructor(private readonly mailerService: MailerService, private readonly logger: MarlboroService) {}

    public async googleAuthRedirect(googleUser: GoogleAuthDto, accountId: number, managerId: number): Promise<MailerDocument | null> {
        const loggerContext = `${MailAuthService.name}/${this.googleAuthRedirect.name}`;
        try {
            if (!googleUser) {
                throw 'No user from google';
            }

            return await this.mailerService.create({
                accountId,
                managerId,
                mailer: {
                    email: googleUser.email,
                    mailUserId: googleUser.id,
                    serviceName: MailsInfo.Google.Service,
                    photo: googleUser.photo,
                    accessToken: googleUser.accessToken,
                    refreshToken: googleUser.refreshToken,
                    unallowedManagers: managerId === -1 ? [] : null,
                },
            });
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async yandexAuthRedirect(yandexUser: YandexAuthDto, accountId: number, managerId: number): Promise<MailerDocument | null> {
        const loggerContext = `${MailAuthService.name}/${this.yandexAuthRedirect.name}`;
        try {
            if (!yandexUser) {
                throw 'No user from yandex';
            }

            return await this.mailerService.create({
                accountId,
                managerId,
                mailer: {
                    email: yandexUser.email,
                    mailUserId: yandexUser.id,
                    serviceName: MailsInfo.Yandex.Service,
                    photo: yandexUser.photo,
                    accessToken: yandexUser.accessToken,
                    refreshToken: yandexUser.refreshToken,
                    unallowedManagers: managerId === -1 ? [] : null,
                },
            });
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async mailruAuthRedirect(mailruUser: MailruAuthDto, accountId: number, managerId: number): Promise<MailerDocument | null> {
        const loggerContext = `${MailAuthService.name}/${this.mailruAuthRedirect.name}`;
        try {
            if (!mailruUser) {
                throw 'No user from mailru';
            }

            return await this.mailerService.create({
                accountId,
                managerId,
                mailer: {
                    email: mailruUser.email,
                    mailUserId: mailruUser.id,
                    serviceName: MailsInfo.Mailru.Service,
                    photo: mailruUser.photo,
                    accessToken: mailruUser.accessToken,
                    refreshToken: mailruUser.refreshToken,
                    unallowedManagers: managerId === -1 ? [] : null,
                },
            });
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public usedMailInfo(redirectUri: string): string {
        return `Эта почта уже подключена к другому аккаунту/менеджеру или является корпоративной. 
			Прежде чем подключить почту к этому аккаунту/менеджеру, отключите ее в другом аккаунте/менеджере. 
			<a href='${decodeURI(redirectUri)}'>Вернуться в amoCRM<a/>`;
    }
}
