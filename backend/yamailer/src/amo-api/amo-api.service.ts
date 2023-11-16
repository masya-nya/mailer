import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthTypes } from '../consts/auth-types';
import { AmoAccount, TokensResponse } from './amo-api.types';
import { UseTokenAuthorization } from './useTokenAuthorization.decorator';
import { AccountRepository } from '../account/account.repository';
import { RequestMethods, RequestMethodsValuesType } from '../consts/request-types';
import { CreateNotesDto, NoteDto } from './dto/notes-create.dto';
import handleError from 'src/utils/handleError';
import { CustomField } from 'src/types/amoCustomField';
import { CreateAmoEntityDto } from 'src/amo-entities/dto/amo-entity-by-mail-create.dto';
import * as dayjs from 'dayjs';
import { MailRDO } from 'src/mails/types/mails.rdo';
import { ConfigService } from '@nestjs/config';
import { AppConfigSchema } from 'src/app.schema';

const AmoEndPoints = {
    Leads: {
        Base: 'leads',
        Notes: 'leads/notes',
        Link: 'leads/link',
    },
    Account: {
        Base: 'account',
    },
    Contacts: {
        Base: 'contacts',
        CustomFields: 'contacts/custom_fields',
        Notes: 'contacts/notes',
    },
    Customers: {
        Base: 'customers',
        Notes: 'customers/notes',
        Link: 'customers/link',
    },
} as const;

type NoteRoutesType = (typeof AmoEndPoints)[keyof Omit<typeof AmoEndPoints, 'Account'>]['Notes'];

@Injectable()
export class AmoApiService {
    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly config: ConfigService<AppConfigSchema>,
        private readonly logger: MarlboroService
    ) {}

    private async apiRequest(
        subdomain: string,
        token: string,
        type: RequestMethodsValuesType,
        endpoint: string,
        config?: AxiosRequestConfig,
        data?: unknown
    ): Promise<AxiosResponse> {
        switch (type) {
            case RequestMethods.Get:
                return await axios[type](`https://${subdomain}.amocrm.ru/api/v4/${endpoint}`, {
                    ...config,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            case RequestMethods.Post:
            case RequestMethods.Patch:
                return await axios[type](`https://${subdomain}.amocrm.ru/api/v4/${endpoint}`, data, {
                    ...config,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        }
    }

    public async requestAccessToken(subdomain: string, code: string): Promise<TokensResponse> {
        const loggerContext = `${AmoApiService.name}/${this.requestAccessToken.name}`;

        try {
            const response = await axios.post(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
                client_id: this.config.get('CLIENT_ID'),
                client_secret: this.config.get('CLIENT_SECRET'),
                grant_type: AuthTypes.Auth,
                redirect_uri: this.config.get('REDIRECT_URI'),
                code,
            });

            return response.data;
        } catch (error) {
            this.logger.error(error.message, loggerContext);
        }
    }

    public async refreshAccessToken(subdomain: string, refreshToken: string): Promise<TokensResponse> {
        const loggerContext = `${AmoApiService.name}/${this.refreshAccessToken.name}`;

        try {
            const response = await axios.post(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
                client_id: this.config.get('CLIENT_ID'),
                client_secret: this.config.get('CLIENT_SECRET'),
                grant_type: AuthTypes.Refresh,
                refresh_token: refreshToken,
            });

            return response.data;
        } catch (error) {
            this.logger.error(error, loggerContext);
        }
    }

    public async getAccountData(subdomain: string, token: string): Promise<AmoAccount> {
        const loggerContext = `${AmoApiService.name}/${this.getAccountData.name}`;

        try {
            const response = await this.apiRequest(subdomain, token, RequestMethods.Get, AmoEndPoints.Account.Base);

            return response.data;
        } catch (error) {
            this.logger.error(error, loggerContext);
        }
    }

    @UseTokenAuthorization()
    public async createLeads(
        { accountId, mails, responsibleUser, isTriggerNote }: CreateAmoEntityDto,
        withNote = false
    ): Promise<Record<'id', number>[]> {
        const loggerContext = `${AmoApiService.name}/${this.createLeads.name}`;

        try {
            const accountInfo = await this.accountRepository.getAccountById(accountId);

            if (!accountInfo) {
                this.logger.error(`Account with id => ${accountId}, not found!`, loggerContext);
                throw new HttpException(`Account with id => ${accountId}, not found!`, HttpStatus.NOT_FOUND);
            }

            const treatedLeads = mails.map((mail) => ({ name: mail.subject, responsible_user_id: responsibleUser }));
            const {
                data: {
                    _embedded: { leads: addedLeads },
                },
            } = await this.apiRequest(
                accountInfo.subdomain,
                accountInfo.accessToken,
                RequestMethods.Post,
                AmoEndPoints.Leads.Base,
                {},
                treatedLeads
            );

            if (withNote) {
                const treatedNotes = this.adapterNotesDto(addedLeads, mails, isTriggerNote);

                await this.createNotes(
                    { subdomain: accountInfo.subdomain, accessToken: accountInfo.accessToken, notes: treatedNotes },
                    AmoEndPoints.Leads.Notes
                );
            }

            return addedLeads;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    @UseTokenAuthorization()
    public async createContactsWithEmail(
        { accountId, mails, responsibleUser, isTriggerNote }: CreateAmoEntityDto,
        withNote = false
    ): Promise<Record<'id', number>[]> {
        const loggerContext = `${AmoApiService.name}/${this.createContactsWithEmail.name}`;

        try {
            const accountInfo = await this.accountRepository.getAccountById(accountId);

            if (!accountInfo) {
                this.logger.error(`Account with id => ${accountId}, not found!`, loggerContext);
                throw new HttpException(`Account with id => ${accountId}, not found!`, HttpStatus.NOT_FOUND);
            }

            const emailField = await this.getContactEmailField(accountInfo.subdomain, accountInfo.accessToken);

            const treatedContacts = mails.map((mail) => ({
                name: mail.from.value[0].name || mail.from.value[0].address,
                responsible_user_id: responsibleUser,
                custom_fields_values: [{ field_id: emailField.id, values: [{ value: mail.from.value[0].address }] }],
            }));

            const {
                data: {
                    _embedded: { contacts: addedContacts },
                },
            } = await this.apiRequest(
                accountInfo.subdomain,
                accountInfo.accessToken,
                RequestMethods.Post,
                AmoEndPoints.Contacts.Base,
                {},
                treatedContacts
            );

            if (withNote) {
                const treatedNotes = this.adapterNotesDto(addedContacts, mails, isTriggerNote);

                await this.createNotes(
                    { subdomain: accountInfo.subdomain, accessToken: accountInfo.accessToken, notes: treatedNotes },
                    AmoEndPoints.Contacts.Notes
                );
            }
            return addedContacts;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    private adapterNotesDto(entities: Record<'id', number>[], mails: MailRDO[], isTriggerNote: boolean): NoteDto[] {
        return entities.map((entity, i) => ({
            title: mails[i].subject,
            text: mails[i].text,
            entityId: entity.id,
            isTrigger: isTriggerNote,
        }));
    }

    public async createNotes({ subdomain, accessToken, notes }: CreateNotesDto, entityRoute: NoteRoutesType): Promise<boolean> {
        const loggerContext = `${AmoApiService.name}/${this.createNotes.name}`;

        try {
            const treatedNotes = notes.map((note) => ({
                entity_id: note.entityId,
                note_type: 'common',
                is_need_to_trigger_digital_pipeline: note.isTrigger,
                params: { text: `Создано по письму: ${note.title}.\n${note.text}` },
            }));

            await this.apiRequest(subdomain, accessToken, RequestMethods.Post, entityRoute, {}, treatedNotes);

            return true;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getContactEmailField(subdomain: string, accessToken: string): Promise<CustomField | null> {
        const loggerContext = `${AmoApiService.name}/${this.getContactEmailField.name}`;

        try {
            const response = await this.apiRequest(subdomain, accessToken, RequestMethods.Get, AmoEndPoints.Contacts.CustomFields);

            const customFields: CustomField[] = response.data?._embedded?.custom_fields || null;

            if (!customFields) {
                this.logger.error(`Custom fields not found!`, loggerContext);
                throw new HttpException(`Custom fields not found!`, HttpStatus.NOT_FOUND);
            }

            const email = customFields.find((field) => field.code.toLowerCase() === 'email');

            return email || null;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    @UseTokenAuthorization()
    public async createCustomersByMail(
        { accountId, mails, responsibleUser, isTriggerNote, nextDate }: CreateAmoEntityDto,
        withNote = false
    ): Promise<Record<'id', number>[]> {
        const loggerContext = `${AmoApiService.name}/${this.createCustomersByMail.name}`;

        try {
            const accountInfo = await this.accountRepository.getAccountById(accountId);

            if (!accountInfo) {
                this.logger.error(`Account with id => ${accountId}, not found!`, loggerContext);
                throw new HttpException(`Account with id => ${accountId}, not found!`, HttpStatus.NOT_FOUND);
            }

            const treatedCustomers = mails.map((mail) => ({
                name: mail.subject,
                responsible_user_id: responsibleUser,
                next_date: nextDate || dayjs().add(1, 'd').unix(),
            }));

            const {
                data: {
                    _embedded: { customers: addedCustomers },
                },
            } = await this.apiRequest(
                accountInfo.subdomain,
                accountInfo.accessToken,
                RequestMethods.Post,
                AmoEndPoints.Customers.Base,
                {},
                treatedCustomers
            );

            if (withNote) {
                const treatedNotes = this.adapterNotesDto(addedCustomers, mails, isTriggerNote);

                await this.createNotes(
                    { subdomain: accountInfo.subdomain, accessToken: accountInfo.accessToken, notes: treatedNotes },
                    AmoEndPoints.Customers.Notes
                );
            }

            return addedCustomers;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async linkContactToEntity(
        accountId: number,
        entityType: 'Leads' | 'Customers',
        entityIds: Record<'id', number>[],
        toEntityIds: Record<'id', number>[]
    ): Promise<boolean> {
        const loggerContext = `${AmoApiService.name}/${this.linkContactToEntity.name}`;

        try {
            const accountInfo = await this.accountRepository.getAccountById(accountId);

            if (!accountInfo) {
                this.logger.error(`Account with id => ${accountId}, not found!`, loggerContext);
                throw new HttpException(`Account with id => ${accountId}, not found!`, HttpStatus.NOT_FOUND);
            }

            const treatedRDO = entityIds.map((entityId, i) => ({
                entity_id: entityId.id,
                to_entity_id: toEntityIds[i].id,
                to_entity_type: 'contacts',
            }));

            await this.apiRequest(
                accountInfo.subdomain,
                accountInfo.accessToken,
                RequestMethods.Post,
                AmoEndPoints[entityType].Link,
                {},
                treatedRDO
            );
            return true;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
