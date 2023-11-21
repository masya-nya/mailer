import { Controller, Get, Post, Patch, Delete, Query, HttpStatus, Param } from '@nestjs/common';
import { Body, HttpCode } from '@nestjs/common/decorators';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Endpoints } from 'src/core/constants/endpoints';
import { Logger } from 'src/core/logger/logger.service';
import { CreateDistributionTemplateDto } from './dto/create-distribution-template.dto';
import { ExactDistributionTemplateRdo } from './rdo/exact-distribution-template.rdo';
import { DistributionTemplateService } from './distribution-template.service';
import { fillDTO } from 'src/core/helpers/fill-dto';
import { DeleteDistributionTemplateDto } from './dto/delete-distribution-template.dto';
import { UpdateDistributionTemplateDto } from './dto/update-distribution-template.dto';
import { QueryAccountIdDto } from 'src/core/types/query-accountId.dto';

@ApiTags('Distribution template')
@Controller(Endpoints.DistributionTemplates.Base)
export class DistributionTemplateController {
    constructor(
        private readonly distributionTemplateService: DistributionTemplateService,
        private readonly logger: Logger
    ) {
        this.logger.log(`${DistributionTemplateController.name} has been initialized`);
    }

    @ApiOperation({ summary: 'Создать шаблон распределения' })
    @ApiCreatedResponse({ type: ExactDistributionTemplateRdo })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    public async createTemplate(
        @Query() { accountId }: QueryAccountIdDto,
        @Body() templateDto: CreateDistributionTemplateDto
    ): Promise<ExactDistributionTemplateRdo> {
        const template = await this.distributionTemplateService.createTemplate(accountId, templateDto);
        return fillDTO(ExactDistributionTemplateRdo, template);
    }

    @ApiOperation({ summary: 'Получение всех шаблонов распределения в аккаунте' })
    @ApiOkResponse({ type: [ExactDistributionTemplateRdo] })
    @HttpCode(HttpStatus.OK)
    @Get()
    public async getAccountTemplates(@Query() { accountId }: QueryAccountIdDto): Promise<ExactDistributionTemplateRdo[]> {
        const templates = await this.distributionTemplateService.getAccountTemplates(accountId);
        return templates.map((template) => fillDTO(ExactDistributionTemplateRdo, template));
    }

    @ApiOperation({ summary: 'Удаление шаблонов распределения в аккаунте' })
    @ApiNoContentResponse()
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    public async deleteTemplates(
        @Query() { accountId }: QueryAccountIdDto,
        @Body() { templateIds }: DeleteDistributionTemplateDto
    ): Promise<void> {
        return await this.distributionTemplateService.deleteTemplates(accountId, templateIds);
    }

    @ApiOperation({ summary: 'Изменение шаблона распределения в аккаунте' })
    @ApiParam({
        example: 31067610,
        name: 'accountId',
    })
    @ApiOkResponse({ type: ExactDistributionTemplateRdo })
    @HttpCode(HttpStatus.OK)
    @Patch('/:accountId')
    public async updateTemplate(
        @Param('accountId') accountId: number,
        @Body() updateTemplate: UpdateDistributionTemplateDto
    ): Promise<ExactDistributionTemplateRdo> {
        const template = await this.distributionTemplateService.updateTemplate(accountId, updateTemplate);
        return fillDTO(ExactDistributionTemplateRdo, template);
    }
}
