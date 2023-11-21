import * as querystring from 'node:querystring';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AccountRepository } from '../account/account.repository';
import { Logger } from '../../core/logger/logger.service';
import { AccountDocument } from '../account/account.model';
import { AuthTypes } from './constants/auth-types';
import { AmoEntityType, AmoLead, AmoRepeatEntity, AmoTask, AmoUser, AmoUserWrapper, TokensResponse } from './types/amo-api.types';
import { UseTokenAuthorization } from './decorators/use-token-authorization.decorator';
import { ApplicationConfigSchema } from 'src/core/config/app.schema';
import { GetAllPage, RequestParams } from './decorators/get-all-page.decorator';
import handleError from 'src/core/helpers/handleError';
import { RepeatEntityType } from 'src/core/types/repeat-sales-entity.type';

type DefaultRequestByAccount = {
    accountId: number;
    subdomain: string;
};

@Injectable()
export class AmoApiService {
    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly configService: ConfigService<ApplicationConfigSchema>,
        private readonly logger: Logger
    ) {}

    private createRequestUrl(subdomain: string, endpoint: string, params?: RequestParams): string {
        return `https://${subdomain}.amocrm.ru/api/v4/${endpoint}` + `${params ? '?' + querystring.stringify(params) : ''}`;
    }

    private async getAccountInfo(accountId: number, subdomain: string): Promise<AccountDocument> {
        const loggerContext = `${AmoApiService.name}/${this.getAccountInfo.name}`;

        try {
            if (!accountId) {
                this.logger.error(`accountId not found`, loggerContext);
                new HttpException(`accessToken or accountId not found`, HttpStatus.BAD_REQUEST);
            }

            const accountInfo = await this.accountRepository.getAccountById(accountId);

            if (!accountInfo) {
                this.logger.error(`Account with id => ${accountId}, not found!`, loggerContext);
                new HttpException(`Account with id => ${accountId}, not found!`, HttpStatus.NOT_FOUND);
            }

            if (accountInfo.subdomain !== subdomain) {
                accountInfo.subdomain = subdomain;
                await this.accountRepository.saveAccountDocument(accountInfo);
            }

            return accountInfo;
        } catch (error) {
            const message = `Error while getting account info`;
            this.logger.error(error, loggerContext);
            handleError(error, message);
        }
    }

    public async requestAccessToken(subdomain: string, code: string): Promise<TokensResponse> {
        const loggerContext = `${AmoApiService.name}/${this.requestAccessToken.name}`;

        try {
            const { data: tokens } = await axios.post<TokensResponse>(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
                client_id: this.configService.get('CLIENT_UUID'),
                client_secret: this.configService.get('CLIENT_SECRET'),
                grant_type: AuthTypes.Auth,
                redirect_uri: this.configService.get('REDIRECT_URI'),
                code,
            });

            return tokens;
        } catch (error) {
            const message = `Error while requesting access token`;
            this.logger.error(error, loggerContext);
            handleError(error, message);
        }
    }

    public async refreshAccessToken(subdomain: string, refreshToken: string): Promise<TokensResponse> {
        const loggerContext = `${AmoApiService.name}/${this.refreshAccessToken.name}`;

        try {
            const { data: tokens } = await axios.post<TokensResponse>(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
                client_id: this.configService.get('CLIENT_UUID'),
                client_secret: this.configService.get('CLIENT_SECRET'),
                grant_type: AuthTypes.Refresh,
                refresh_token: refreshToken,
            });

            return tokens;
        } catch (error) {
            this.logger.error(error, loggerContext);
        }
    }

    @GetAllPage
    @UseTokenAuthorization()
    public async getAccountUsers({ accountId, subdomain }: DefaultRequestByAccount, params?: RequestParams): Promise<AmoUser[]> {
        const account = await this.getAccountInfo(accountId, subdomain);
        return axios
            .get<AmoUserWrapper>(this.createRequestUrl(subdomain, 'users', params), {
                headers: {
                    Authorization: `Bearer ${account.accessToken}`,
                },
            })
            .then((res) => (res.data ? res.data._embedded.users : []));
    }

    @UseTokenAuthorization()
    public async getUser({ accountId, subdomain }: DefaultRequestByAccount, userId: number, params?: RequestParams): Promise<AmoUser> {
        const account = await this.getAccountInfo(accountId, subdomain);
        const url = this.createRequestUrl(subdomain, 'users', params);
        return axios
            .get<AmoUser>(`${url}/${userId}`, {
                headers: {
                    Authorization: `Bearer ${account.accessToken}`,
                },
            })
            .then((res) => res.data);
    }

    @UseTokenAuthorization()
    public async getEntityTasks(accountId: number, entityType: AmoEntityType, entityId: number): Promise<AmoTask[]> {
        const account = await this.accountRepository.getAccountById(accountId);

        if (!account) {
            throw new Error('Account not found');
        }

        const url = this.createRequestUrl(account.subdomain, 'tasks', { 'filter[entity_type]': entityType, 'filter[entity_id]': entityId });
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });

        if (res.status === HttpStatus.NO_CONTENT) {
            return [];
        }

        return res.data._embedded.tasks;
    }

    @UseTokenAuthorization()
    public async changeEntitiesResponsible(
        accountId: number,
        entityType: AmoEntityType,
        entities: { id: number; responsible_user_id: number }[]
    ): Promise<void> {
        const account = await this.accountRepository.getAccountById(accountId);

        if (!account) {
            throw new Error('Account not found');
        }

        const url = this.createRequestUrl(account.subdomain, entityType);
        await axios.patch(url, entities, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });
    }

    @UseTokenAuthorization()
    public async changeEntityTasksResponsible(
        accountId: number,
        entityType: AmoEntityType,
        entityId: number,
        userId: number
    ): Promise<void> {
        const tasks = await this.getEntityTasks(accountId, entityType, entityId);

        if (!tasks.length) {
            return;
        }

        const activeTasks = tasks.filter((task) => !task.is_completed && task.responsible_user_id !== userId);

        if (!activeTasks.length) {
            return;
        }

        const treatedTasks = activeTasks.map((task) => ({
            id: task.id,
            responsible_user_id: userId,
        }));

        await this.changeEntitiesResponsible(accountId, 'tasks', treatedTasks);
    }

    @UseTokenAuthorization()
    public async getLeadInfo(accountId: number, leadId: number): Promise<AmoLead> {
        const account = await this.accountRepository.getAccountById(accountId);

        if (!account) {
            throw new Error('Account not found');
        }

        const url = this.createRequestUrl(account.subdomain, `leads/${leadId}`, { with: 'contacts' });
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });

        if (res.status === HttpStatus.NO_CONTENT) {
            return null;
        }

        return res.data;
    }

    @UseTokenAuthorization()
    public async getEntityInfo(accountId: number, entityId: number, entityType: 'contacts' | 'companies'): Promise<AmoRepeatEntity> {
        const account = await this.accountRepository.getAccountById(accountId);

        if (!account) {
            throw new Error('Account not found');
        }

        const url = this.createRequestUrl(account.subdomain, `${entityType}/${entityId}`);
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${account.accessToken}`,
            },
        });

        if (res.status === HttpStatus.NO_CONTENT) {
            return null;
        }

        return res.data;
    }

    @UseTokenAuthorization()
    public async getRepeatEntityResponsible(accountId: number, leadId: number, entity: RepeatEntityType): Promise<AmoRepeatEntity | null> {
        const leadInfo = await this.getLeadInfo(accountId, leadId);

        switch (entity) {
            case 'contact':
                const [mainContact] = leadInfo._embedded.contacts.filter((contact) => contact.is_main);
                if (!mainContact) {
                    return null;
                }

                const contactInfo = await this.getEntityInfo(accountId, mainContact.id, 'contacts');

                return contactInfo || null;
            case 'company':
                const [mainCompany] = leadInfo._embedded.companies;
                if (!mainCompany) {
                    return null;
                }

                const companyInfo = await this.getEntityInfo(accountId, mainContact.id, 'companies');

                return companyInfo || null;
            default:
                return null;
        }
    }
}
