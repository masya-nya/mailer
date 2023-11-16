import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AmoApiService } from '../amo-api/amo-api.service';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import { Account, AccountDocument } from './account.model';
import { AccountRepository } from './account.repository';
import { AccountUninstallDto } from './dto/account-uninstall.dto';
import { AccountInstallDto } from './dto/account-install.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AccountService {
    constructor(
        private readonly amoApiService: AmoApiService,
        private readonly accountRepository: AccountRepository,
        private readonly logger: MarlboroService
    ) {}

    public async install({ referer, code }: AccountInstallDto): Promise<AccountDocument | HttpException> {
        const loggerContext = `${AccountService.name}/${this.install.name}`;

        try {
            const [accountSubdomain = null]: string[] = referer?.split('.') || [];

            if (!accountSubdomain || !code) {
                this.logger.error('No subdomain or code was passed!', loggerContext);
                return new HttpException('No subdomain or code was passed!', HttpStatus.BAD_REQUEST);
            }

            const tokenData = await this.amoApiService.requestAccessToken(accountSubdomain, code);

            if (!tokenData) {
                this.logger.error('Failed to log in!', loggerContext, accountSubdomain);
                return new HttpException('Failed to log in!!', HttpStatus.UNAUTHORIZED);
            }

            const accountData = await this.amoApiService.getAccountData(accountSubdomain, tokenData.access_token);

            if (!accountData) {
                this.logger.error('Failed to retrieve account information!', loggerContext, accountSubdomain);
                return new HttpException('Failed to retrieve account information!', HttpStatus.NOT_FOUND);
            }

            const appAccount = await this.accountRepository.getAccountById(accountData.id);

            if (!appAccount) {
                const newAccount: Account = {
                    id: accountData.id,
                    accessToken: tokenData.access_token,
                    refreshToken: tokenData.refresh_token,
                    subdomain: accountSubdomain,
                    installed: true,
                };

                const installedAccount = await this.accountRepository.createAccount(newAccount);

                this.logger.info('Widget has been installed and account added to DataBase!', loggerContext);

                return installedAccount;
            }

            appAccount.installed = true;
            appAccount.accessToken = tokenData.access_token;
            appAccount.refreshToken = tokenData.refresh_token;

            const installedAccount = await this.accountRepository.updateAccountByID(appAccount);

            this.logger.info('Widget has been installed and account updated in DataBase!', loggerContext);

            return installedAccount;
        } catch (error) {
            this.logger.error(error, loggerContext);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async unInstall({ account_id }: AccountUninstallDto): Promise<AccountDocument | HttpException> {
        const loggerContext = `${AccountService.name}/${this.unInstall.name}`;

        try {
            const accountId = Number(account_id) || null;

            if (!accountId) {
                this.logger.error('AccountId was not passed', loggerContext);
                return new HttpException('AccountId was not passed', HttpStatus.BAD_REQUEST);
            }

            const appAccount = await this.accountRepository.getAccountById(accountId);

            if (!appAccount) {
                this.logger.error('Account not found', loggerContext);
                return new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            appAccount.installed = false;

            const unInstalledAccount = await this.accountRepository.updateAccountByID(appAccount);

            this.logger.info('Account has been uninstalled!', loggerContext);

            return unInstalledAccount;
        } catch (error) {
            this.logger.error(error, loggerContext);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Cron(CronExpression.EVERY_12_HOURS)
    public async updateAllTokens(): Promise<void> {
        const loggerContext = `${AccountService.name}/${this.updateAllTokens.name}`;

        try {
            this.logger.info('Cron start updating tokens', loggerContext);

            const accounts = await this.accountRepository.getAllAccounts();
            for (const user of accounts) {
                const token = await this.amoApiService.refreshAccessToken(user.subdomain, user.refreshToken);
                if (token) {
                    await this.accountRepository.updateTokensByAccountId(user.id, token.access_token, token.refresh_token);
                    this.logger.info(`Token to user with subdomain: ${user.subdomain}, had updated`, loggerContext);
                } else {
                    this.logger.warn(`Token to user with subdomain: ${user.subdomain}, had not updated`, loggerContext);
                }
            }

            this.logger.info(`Cron had finished updating tokens, was updated ${accounts.length} tokens`, loggerContext);
        } catch (error) {
            this.logger.error('Error cron updating tokens', loggerContext);
            this.logger.error(error, loggerContext);
        }
    }
}
