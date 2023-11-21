import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountDocument } from './account.model';
import { getEndOfTrialPeriodDate, getStartUsingDate } from '../../core/helpers/calculate-trial-period.helper';
import * as dayjs from 'dayjs';
import { AmoApiService } from '../amo-api/amo-api.service';
import { AccountRepository } from './account.repository';
import { Logger } from '../../core/logger/logger.service';
import { Cron } from '@nestjs/schedule';
import { CronSettings } from './constants/cron-settings';
import jwt_decode from 'jwt-decode';
import { DecodedAmoAccessTokenTypes } from './types/decoded-amo-access-token.types';
import { AccountInstallDto } from './dto/account-install.dto';
import { AccountUninstallDto } from './dto/account-uninstall.dto';
import { UserRepository } from '../users/user.repository';
import handleError from 'src/core/helpers/handleError';
import { WorkScheduleRepository } from '../work-schedule/work-schedule.repository';
import { DistributionTemplateRepository } from '../distribution-templates/distribution-template.repository';
import { TriggerRepository } from '../triggers/trigger.repository';
import { WebhookQueueRepository } from '../webhook-queue/webhook-queue.repository';

@Injectable()
export class AccountService {
    constructor(
        private readonly amoApiService: AmoApiService,
        private readonly accountRepository: AccountRepository,
        private readonly userRepository: UserRepository,
        private readonly workScheduleRepository: WorkScheduleRepository,
        private readonly distributionTemplateRepository: DistributionTemplateRepository,
        private readonly triggerRepository: TriggerRepository,
        private readonly webhookQueueRepository: WebhookQueueRepository,
        private readonly logger: Logger
    ) {}

    public async install(accountInstallInfo: AccountInstallDto): Promise<AccountDocument | HttpException> {
        const loggerContext = `${AccountService.name}/${this.install.name}`;

        try {
            const { referer, code } = accountInstallInfo;

            const refererParts = referer?.length ? referer.split('.') : [];

            const [accountSubdomain] = refererParts.length ? refererParts : [null];

            if (!accountSubdomain || !code) {
                this.logger.error('No subdomain or code was passed!', loggerContext);
                return new HttpException('No subdomain or code was passed!', HttpStatus.BAD_REQUEST);
            }

            const tokenData = await this.amoApiService.requestAccessToken(accountSubdomain, code);

            if (!tokenData) {
                this.logger.error('Failed to log in!', loggerContext, accountSubdomain);
                return new HttpException('Failed to log in!', HttpStatus.UNAUTHORIZED);
            }

            const decodedToken: DecodedAmoAccessTokenTypes = jwt_decode(tokenData.access_token);

            const accountId = decodedToken.account_id;

            if (!accountId) {
                this.logger.error('Failed to retrieve user information!', loggerContext, accountSubdomain);
                return new HttpException('Failed to retrieve user information!', HttpStatus.NOT_FOUND);
            }

            const appAccount = await this.accountRepository.getAccountById(accountId);

            if (!appAccount) {
                const newAccount = {
                    id: accountId,
                    accessToken: tokenData.access_token,
                    refreshToken: tokenData.refresh_token,
                    subdomain: accountSubdomain,
                    installed: true,
                    startUsingDate: getStartUsingDate(),
                    finishTrialDate: getEndOfTrialPeriodDate(dayjs()),
                    finishPaymentDate: '',
                    isTrial: true,
                    isPaid: false,
                    isActive: true,
                };

                const installedAccount = await this.accountRepository.createAccount(newAccount);
                await this.webhookQueueRepository.createQueue(accountId);

                const accountUsers = await this.amoApiService.getAccountUsers({ accountId: newAccount.id, subdomain: accountSubdomain });

                const workSchedule = await this.workScheduleRepository.createOfficeWorkSchedule(installedAccount._id);

                const treatedUsers = accountUsers.map((user) => ({
                    workSchedule: workSchedule._id,
                    ...user,
                }));

                await this.userRepository.insertUsers(treatedUsers, installedAccount);

                this.logger.info('Widget has been installed and account added to DataBase!', loggerContext);

                return installedAccount;
            }

            appAccount.installed = true;
            appAccount.accessToken = tokenData.access_token;
            appAccount.refreshToken = tokenData.refresh_token;

            const installedAccount = await this.accountRepository.saveAccountDocument(appAccount);
            await this.webhookQueueRepository.createQueue(accountId);

            const accountUsers = await this.amoApiService.getAccountUsers({ accountId: installedAccount.id, subdomain: accountSubdomain });

            const workSchedule = await this.workScheduleRepository.createOfficeWorkSchedule(installedAccount._id);

            const treatedUsers = accountUsers.map((user) => ({
                workSchedule: workSchedule._id,
                ...user,
            }));

            await this.userRepository.insertUsers(treatedUsers, installedAccount);

            this.logger.info('Widget has been installed and account updated in DataBase!', loggerContext);

            // * ЗАКОМЕНТИЛ ТАК КАК КИДАЕТ ОШИБКУ, ВЕРНУТЬ НА ПОСЛЕДНЕМ ЭТАПЕ
            // try {
            //     await redirectAccountInfoToExternal(Endpoints.WidgetController, {
            //         client_uuid: accountInstallInfo.client_id,
            //         account_id: accountId,
            //     });
            // } catch (redirectError) {
            //     this.logger.error(redirectError, loggerContext);
            // }

            return installedAccount;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async unInstall(accountUninstallInfo: AccountUninstallDto): Promise<AccountDocument | HttpException> {
        const loggerContext = `${AccountService.name}/${this.unInstall.name}`;

        try {
            const { account_id } = accountUninstallInfo;

            const accountId = Number(account_id) || null;

            if (!accountId) {
                this.logger.error('AccountId was not passed', loggerContext);
                return new HttpException('AccountId was not passed', HttpStatus.BAD_REQUEST);
            }

            const appAccount = await this.accountRepository.getAccountById(accountId);

            if (!appAccount) {
                this.logger.error('Account not found', loggerContext);
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            appAccount.installed = false;

            const unInstalledAccount = await this.accountRepository.saveAccountDocument(appAccount);

            await this.userRepository.clearUsersByAccount(unInstalledAccount);
            await this.distributionTemplateRepository.deleteTemplatesByAccount(appAccount._id);
            await this.webhookQueueRepository.deleteAccountWebhookQueues(accountId);
            await this.triggerRepository.deleteAccountTriggers(unInstalledAccount._id);
            await this.workScheduleRepository.deleteAccountWorkSchedule(unInstalledAccount._id);

            this.logger.info('Account has been uninstalled and all users has bean deleted from database', loggerContext);

            // * ЗАКОМЕНТИЛ ТАК КАК КИДАЕТ ОШИБКУ, ВЕРНУТЬ НА ПОСЛЕДНЕМ ЭТАПЕ
            // try {
            //     await redirectAccountInfoToExternal(Endpoints.WidgetController, accountUninstallInfo);
            // } catch (redirectError) {
            //     this.logger.error(redirectError, loggerContext);
            // }
            return unInstalledAccount;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async paidStatus(accountId: number): Promise<boolean | HttpException> {
        const loggerContext = `${AccountService.name}/${this.paidStatus.name}`;

        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                this.logger.error('User not found in database', loggerContext);
                return new HttpException('Account not found in database', HttpStatus.NOT_FOUND);
            }

            return account.isPaid || account.isTrial;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    @Cron(CronSettings.CronPaymentStatusCheckTime)
    protected async accountsPaymentStatusLoop(): Promise<void> {
        const loggerContext = `${AccountService.name}/${this.accountsPaymentStatusLoop.name}`;

        try {
            const accountDocuments = await this.accountRepository.getAllAccounts();

            for (const accountDocument of accountDocuments) {
                await this.accountPaymentChecker(accountDocument);
            }
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    @Cron(CronSettings.CronUpdateAccountTokensTime)
    protected async updateAllAccountsTokens(): Promise<void> {
        const loggerContext = `${AccountService.name}/${this.updateAllAccountsTokens.name}`;

        try {
            this.logger.info('Cron start updating tokens', loggerContext);

            const accountDocuments = await this.accountRepository.getAllAccounts();

            for (const account of accountDocuments) {
                const token = await this.amoApiService.refreshAccessToken(account.subdomain, account.refreshToken);

                if (token) {
                    account.accessToken = token.access_token;
                    account.refreshToken = token.refresh_token;
                    await this.accountRepository.saveAccountDocument(account);
                    this.logger.info(`Token to user with subdomain: ${account.subdomain}, had updated`, loggerContext);
                } else {
                    this.logger.warn(`Token to user with subdomain: ${account.subdomain}, had not updated`, loggerContext);
                }
            }

            this.logger.info(`Cron had finished updating tokens, was updated ~${accountDocuments.length} tokens`, loggerContext);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    private async accountPaymentChecker(accountDocument: AccountDocument): Promise<void> {
        const loggerContext = `${AccountService.name}/${this.accountPaymentChecker.name}`;

        try {
            if (!accountDocument.isActive) {
                this.logger.info(`Account is disabled!`, loggerContext, accountDocument.subdomain);
                return;
            }

            if (accountDocument.isPaid && dayjs(accountDocument.finishPaymentDate).diff(dayjs()) <= 0) {
                accountDocument.isPaid = false;
                accountDocument.isActive = false;
                await this.accountRepository.saveAccountDocument(accountDocument);
                this.logger.info('Account was disabled by reason: End of payment period', loggerContext, accountDocument.subdomain);
                return;
            }

            if (dayjs(accountDocument.finishTrialDate).diff(dayjs()) <= 0) {
                accountDocument.isTrial = false;
                accountDocument.isActive = false;
                await this.accountRepository.saveAccountDocument(accountDocument);
                this.logger.info('Account was disabled by reason: End of trial period', loggerContext, accountDocument.subdomain);
                return;
            }

            this.logger.info('Account is active!', loggerContext, accountDocument.subdomain);
        } catch (error) {
            const message = `Error while checking account payment`;
            this.logger.error(error, loggerContext);
            handleError(error, message);
        }
    }
}
