import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import handleError from 'src/core/helpers/handleError';
import { Logger } from 'src/core/logger/logger.service';
import { AccountRepository } from '../account/account.repository';
import { DistributionTemplateRepository } from '../distribution-templates/distribution-template.repository';
import { UpdateTriggerInfo } from './dto/update-trigger.dto';
import { TriggerDocument, TriggerPopulatedTemplateAndSettings } from './trigger.model';
import { TriggerRepository } from './trigger.repository';
import { WebhookTriggerInfo } from './dto/webhook-trigger.dto';
import { WebhookQueueService } from '../webhook-queue/webhook-queue.service';
import * as dayjs from 'dayjs';
import { WebhookQueueItem } from '../webhook-queue/types/webhook-queue-item.type';
import { Types } from 'mongoose';

@Injectable()
export class TriggerService {
    constructor(
        private readonly triggerRepository: TriggerRepository,
        private readonly distributionTemplateRepository: DistributionTemplateRepository,
        private readonly accountRepository: AccountRepository,
        @Inject(forwardRef(() => WebhookQueueService))
        private readonly webhookQueueService: WebhookQueueService,
        private readonly logger: Logger
    ) {
        this.logger.log(`${TriggerService.name} has been initialized`);
    }

    async createTrigger(accountId: number, templateId: string, triggerUuid: string): Promise<TriggerDocument> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            const template = await this.distributionTemplateRepository.getTemplate(account._id, templateId);

            if (!template) {
                throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
            }

            const trigger = await this.triggerRepository.createTrigger({
                triggerUuid,
                account: account._id,
                template: template._id,
                distributionType: template.distributionType,
                distributionSettings: template.distributionSettings.map((settings) => ({ user: settings.user._id, weight: 0 })),
            });

            return trigger;
        } catch (error) {
            const message = `Error while creating trigger`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async updateTrigger(triggerId: Types.ObjectId, updateOptions: UpdateTriggerInfo): Promise<TriggerDocument> {
        try {
            const updatedTrigger = await this.triggerRepository.update(triggerId, updateOptions);
            return updatedTrigger;
        } catch (error) {
            const message = `Error while updating trigger`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async getWebhookTrigger(webhookDto: WebhookQueueItem): Promise<TriggerPopulatedTemplateAndSettings> {
        try {
            const accountId = webhookDto.accountId;
            const subdomain = webhookDto.subdomain;
            const { templateId, triggerUuid } = webhookDto.triggerInfo;

            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            if (account.subdomain !== subdomain) {
                account.subdomain = subdomain;
                await this.accountRepository.saveAccountDocument(account);
            }

            const isTrial = account.isTrial && dayjs().isBefore(dayjs(account.finishTrialDate));
            const isPaid = account.isPaid && dayjs().isBefore(dayjs(account.finishPaymentDate));
            if (!isTrial && !isPaid) {
                throw new HttpException('Widget not paid', HttpStatus.FORBIDDEN);
            }

            const template = await this.distributionTemplateRepository.getTemplate(account._id, templateId);

            if (!template) {
                throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
            }

            let preparatoryTrigger = await this.triggerRepository.getTriggerByUuid(triggerUuid);
            if (!preparatoryTrigger) {
                preparatoryTrigger = await this.createTrigger(accountId, templateId, triggerUuid);
            }

            if (preparatoryTrigger.template.toString() !== template._id.toString()) {
                await this.triggerRepository.update(preparatoryTrigger._id, {
                    template: template._id,
                    distributionType: template.distributionType,
                    distributionSettings: template.distributionSettings.map((settings) => ({ user: settings.user._id, weight: 0 })),
                });
            }

            const trigger = await this.triggerRepository.getTriggerByUuidPopulated(triggerUuid);

            return trigger;
        } catch (error) {
            const message = `Error while getting trigger from webhook`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async handleWebhook(webhook: WebhookTriggerInfo): Promise<void> {
        try {
            const accountId = Number(webhook.account_id);
            const subdomain = webhook.subdomain;
            const triggerData = webhook.event.data;
            const parsedInfo = webhook.action.settings;
            const triggerInfo = { triggerUuid: parsedInfo.triggerUuid, templateId: parsedInfo.templateId };

            await this.webhookQueueService.addWebhookInQueue({
                subdomain,
                accountId,
                triggerData,
                triggerInfo,
            });

            this.webhookQueueService.treatWebhooksQueue(accountId);
        } catch (error) {
            const message = `Error while handling trigger webhook`;
            this.logger.error(message, error);
        }
    }

    async deleteTriggersByUuid(accountId: number, triggerIds: string[]): Promise<void> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            await this.triggerRepository.deleteTriggersByUuid(account._id, triggerIds);
        } catch (error) {
            const message = `Error while deleting triggers`;
            this.logger.error(message, error);
        }
    }
}
