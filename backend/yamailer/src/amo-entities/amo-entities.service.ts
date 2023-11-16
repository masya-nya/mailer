import { Injectable } from '@nestjs/common';
import { AmoApiService } from 'src/amo-api/amo-api.service';
import { MarlboroService } from 'src/marlboroLogger/marlboro.service';
import handleError from 'src/utils/handleError';
import { CreateAmoEntityDto } from './dto/amo-entity-by-mail-create.dto';

@Injectable()
export class AmoEntitiesService {
    constructor(private readonly amoApiService: AmoApiService, private readonly logger: MarlboroService) {}

    public async createLeadsByMail(leadsDto: CreateAmoEntityDto): Promise<boolean> {
        const loggerContext = `${AmoEntitiesService.name}/${this.createLeadsByMail.name}`;

        try {
            const addedContacts = await this.amoApiService.createContactsWithEmail(leadsDto);
            const addedLeads = await this.amoApiService.createLeads(leadsDto, true);

            return await this.amoApiService.linkContactToEntity(leadsDto.accountId, 'Leads', addedLeads, addedContacts);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async createContactsByMail(contactsDto: CreateAmoEntityDto): Promise<boolean> {
        const loggerContext = `${AmoEntitiesService.name}/${this.createContactsByMail.name}`;

        try {
            await this.amoApiService.createContactsWithEmail(contactsDto, true);
            return true;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async createCustomersByMail(customersDto: CreateAmoEntityDto): Promise<boolean> {
        const loggerContext = `${AmoEntitiesService.name}/${this.createCustomersByMail.name}`;

        try {
            const addedContacts = await this.amoApiService.createContactsWithEmail(customersDto);
            const addedCustomers = await this.amoApiService.createCustomersByMail(customersDto, true);
            return await this.amoApiService.linkContactToEntity(customersDto.accountId, 'Customers', addedCustomers, addedContacts);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
