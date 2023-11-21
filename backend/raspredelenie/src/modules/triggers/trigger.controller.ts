import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Endpoints } from 'src/core/constants/endpoints';
import { Logger } from 'src/core/logger/logger.service';
import { TriggerService } from './trigger.service';
import { WebhookTriggerInfo } from './dto/webhook-trigger.dto';
import { DeleteTriggerDto } from './dto/delete-trigger.dto';

@ApiTags('Triggers')
@Controller(Endpoints.Triggers.Base)
export class TriggerController {
    constructor(
        private readonly triggerService: TriggerService,
        private readonly logger: Logger
    ) {
        this.logger.log(`${TriggerController.name} has been initialized`);
    }

    @Post(Endpoints.Triggers.Webhook)
    @HttpCode(HttpStatus.OK)
    public async handleWebhook(@Body() webhook: WebhookTriggerInfo): Promise<void> {
        await this.triggerService.handleWebhook(webhook);
    }

    @ApiOperation({ summary: 'Удаление тригеров по uuid' })
    @ApiNoContentResponse()
    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteTriggers(@Body() triggersDto: DeleteTriggerDto): Promise<void> {
        await this.triggerService.deleteTriggersByUuid(triggersDto.accountId, triggersDto.triggerUuids);
    }
}
