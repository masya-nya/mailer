import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { Endpoints } from 'src/consts/endpoints';
import { AmoEntitiesService } from './amo-entities.service';
import { CreateAmoEntityDto } from './dto/amo-entity-by-mail-create.dto';

@ApiTags('Создание сущностей в amo')
@Controller(Endpoints.MailService.AmoEntity.Root)
export class AmoEntitiesController {
    constructor(private readonly amoEntitiesService: AmoEntitiesService) {}

    @ApiOperation({ summary: 'Создание сделок на оснавании письма' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Post(Endpoints.MailService.AmoEntity.Leads)
    @HttpCode(HttpStatusCode.Ok)
    public async createLeads(@Body() leadsDto: CreateAmoEntityDto): Promise<boolean> {
        return await this.amoEntitiesService.createLeadsByMail(leadsDto);
    }

    @ApiOperation({ summary: 'Создание контактов на основании письма' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Post(Endpoints.MailService.AmoEntity.Contacts)
    @HttpCode(HttpStatusCode.Ok)
    public async createContacts(@Body() contactsDto: CreateAmoEntityDto): Promise<boolean> {
        return await this.amoEntitiesService.createContactsByMail(contactsDto);
    }

    @ApiOperation({ summary: 'Создание покупателей на основании письма' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Post(Endpoints.MailService.AmoEntity.Customers)
    @HttpCode(HttpStatusCode.Ok)
    public async createCustomers(@Body() customersDto: CreateAmoEntityDto): Promise<boolean> {
        return await this.amoEntitiesService.createCustomersByMail(customersDto);
    }
}
