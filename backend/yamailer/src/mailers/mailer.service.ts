import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import { MailerCreateDto } from './dto/mailer-create.dto';
import { MailerRepository } from './mailer.repository';
import handleError from './../utils/handleError';
import { MailerDocument, MailerRdo } from './mailer.model';
import { MailerGetAllDto } from './dto/mailer-getAll.dto';
import axios from 'axios';
import { MailerGetByEmailDto } from './dto/mailer-getByEmail.dto';
import MailsInfo from 'src/consts/mailsInfo';
import { GoogleTokenResponse, MailruTokenResponse, YandexTokenResponse } from './types/UpdateTokenResponse';
import { MailerDeleteDto } from './dto/mailer-delete.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { AppConfigSchema } from 'src/app.schema';
import { MailerEditAccessDto } from './dto/maielr-editAccess.dto';
import { ImapService } from 'src/imap/imap.service';

@Injectable()
export class MailerService {
    constructor(
        private readonly mailerRepository: MailerRepository,
        private readonly imapService: ImapService,
        private readonly logger: MarlboroService,
        private readonly config: ConfigService<AppConfigSchema>
    ) {}

    public getMailerRDO(mailer: MailerDocument): MailerRdo {
        return {
            email: mailer.email,
            photo: mailer.photo,
            serviceName: mailer.serviceName,
            unallowedManagers: mailer?.unallowedManagers || null,
        };
    }

    public getMailerArrayRDO(mailers: MailerDocument[]): MailerRdo[] {
        return mailers.map((mailer) => this.getMailerRDO(mailer));
    }

    public async create({ accountId, managerId, mailer }: MailerCreateDto): Promise<MailerDocument | null> {
        const loggerContext = `${MailerService.name}/${this.create.name}`;

        try {
            const isValidEmail = await this.mailerRepository.createMailer(accountId, managerId, mailer);
            if (!isValidEmail) {
                return null;
            }

            return this.mailerRepository.getByEmail(accountId, managerId, mailer.email);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getAll({ accountId, managerId }: MailerGetAllDto): Promise<MailerDocument[]> {
        const loggerContext = `${MailerService.name}/${this.getAll.name}`;

        try {
            return await this.mailerRepository.getMailers(accountId, managerId);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async delete({ accountId, managerId, email }: MailerDeleteDto): Promise<void> {
        const loggerContext = `${MailerService.name}/${this.delete.name}`;

        try {
            const mailer = await this.mailerRepository.getByEmail(accountId, managerId, email);
            await this.imapService.removeImapConnection(email);
            if (mailer && mailer.serviceName === MailsInfo.Google.Service) {
                await axios.post(`https://oauth2.googleapis.com/revoke?token=${mailer.refreshToken}`);
            }
            await this.mailerRepository.delete(accountId, managerId, email);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getByEmail({ accountId, managerId, email }: MailerGetByEmailDto): Promise<MailerDocument> {
        const loggerContext = `${MailerService.name}/${this.getByEmail.name}`;

        try {
            return await this.mailerRepository.getByEmail(accountId, managerId, email);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    private async updateGoogleToken(accountId: number, managerId: number, mailer: MailerDocument): Promise<string> {
        const loggerContext = `${MailerService.name}/${this.updateGoogleToken.name}`;

        try {
            const { data: newToken } = await axios.post<GoogleTokenResponse>(
                'https://oauth2.googleapis.com/token',
                {
                    client_id: this.config.get('GOOGLE_CLIENT_ID'),
                    client_secret: this.config.get('GOOGLE_CLIENT_SECRET'),
                    grant_type: 'refresh_token',
                    refresh_token: mailer.refreshToken,
                },
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            if (!newToken) {
                throw new HttpException('Error updating token to google', HttpStatus.UNAUTHORIZED);
            }

            await this.mailerRepository.edit(accountId, managerId, {
                email: mailer.email,
                accessToken: newToken.access_token,
                refreshToken: newToken.refresh_token || mailer.refreshToken,
            });
            return newToken.access_token;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    private async updateYandexToken(accountId: number, managerId: number, mailer: MailerDocument): Promise<string> {
        const loggerContext = `${MailerService.name}/${this.updateYandexToken.name}`;

        try {
            const { data: newToken } = await axios.post<YandexTokenResponse>(
                'https://oauth.yandex.ru/token',
                {
                    client_id: this.config.get('YANDEX_CLIENT_ID'),
                    client_secret: this.config.get('YANDEX_CLIENT_SECRET'),
                    grant_type: 'refresh_token',
                    refresh_token: mailer.refreshToken,
                },
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            if (!newToken) {
                throw new HttpException('Error updating token to yandex', HttpStatus.UNAUTHORIZED);
            }

            await this.mailerRepository.edit(accountId, managerId, {
                email: mailer.email,
                accessToken: newToken.access_token,
                refreshToken: newToken.refresh_token,
            });
            return newToken.access_token;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    private async updateMailruToken(accountId: number, managerId: number, mailer: MailerDocument): Promise<string> {
        const loggerContext = `${MailerService.name}/${this.updateMailruToken.name}`;

        try {
            const { data: newToken } = await axios.post<MailruTokenResponse>(
                'https://oauth.mail.ru/token',
                {
                    client_id: this.config.get('MAILRU_CLIENT_ID'),
                    grant_type: 'refresh_token',
                    refresh_token: mailer.refreshToken,
                },
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            if (!newToken || newToken?.error) {
                throw new HttpException('Error updating token to mailru', HttpStatus.UNAUTHORIZED);
            }

            await this.mailerRepository.edit(accountId, managerId, { email: mailer.email, accessToken: newToken.access_token });
            return newToken.access_token;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async updateToken(accountId: number, managerId: number, mailer: MailerDocument): Promise<string> {
        const loggerContext = `${MailerService.name}/${this.updateToken.name}`;

        try {
            switch (mailer.serviceName) {
                case MailsInfo.Google.Service:
                    return await this.updateGoogleToken(accountId, managerId, mailer);
                case MailsInfo.Yandex.Service:
                    return await this.updateYandexToken(accountId, managerId, mailer);
                case MailsInfo.Mailru.Service:
                    return await this.updateMailruToken(accountId, managerId, mailer);
            }
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    @Cron(CronExpression.EVERY_12_HOURS)
    public async updateAllTokens(): Promise<void> {
        const loggerContext = `${MailerService.name}/${this.updateAllTokens.name}`;

        try {
            this.logger.info('Cron start updating tokens to Mailers', loggerContext);
            const users = await this.mailerRepository.getAllUsers();
            for (const user of users) {
                this.logger.info(
                    `Start updating tokens to user, with accountId: ${user.accountId}; managerId: ${user.managerId}`,
                    loggerContext
                );
                for (const mailer of user.mailers) {
                    try {
                        await this.updateToken(user.accountId, user.managerId, mailer);
                        this.logger.info(`Token to email: ${mailer.email}, had updated`, loggerContext);
                    } catch (error) {
                        this.logger.warn(`Token to email: ${mailer.email}, had not updated`, loggerContext);
                    }
                }
            }

            this.logger.info(`Cron had finished updating tokens to Mailers`, loggerContext);
        } catch (error) {
            this.logger.error('Error cron updating tokens to Mailers', loggerContext);
            this.logger.error(error, loggerContext);
        }
    }

    public async editCorporateMailAccesses(userInfo: MailerEditAccessDto): Promise<boolean> {
        const loggerContext = `${MailerService.name}/${this.editCorporateMailAccesses.name}`;

        try {
            await this.mailerRepository.editCorporateMailAccesses(userInfo);
            return true;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
