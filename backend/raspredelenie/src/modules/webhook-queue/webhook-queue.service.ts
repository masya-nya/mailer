import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Logger } from 'src/core/logger/logger.service';
import { WebhookQueueRepository } from './webhook-queue.repository';
import { AmoApiService } from '../amo-api/amo-api.service';
import handleError from 'src/core/helpers/handleError';
import { WebhookQueueItem } from './types/webhook-queue-item.type';
import { DistributionService } from '../distribution/distribution.service';
import { TriggerService } from '../triggers/trigger.service';
import { Types } from 'mongoose';
import { TreatedTriggerQueueItem } from './types/treated-trigger-queue-item.type';
import { RedistributeTriggerQueueItem } from './types/redistribute-trigger-queue-item.type';
import { TreatedTriggerPopulatedTrigger, WebhookQueueItemDocument } from './webhook-queue.model';

@Injectable()
export class WebhookQueueService {
    private webhookQueueStatus: {
        [key in string]: boolean;
    } = {};

    private readyWebhookQueueStatus: {
        [key in string]: boolean;
    } = {};

    constructor(
        private readonly webhookQueueRepository: WebhookQueueRepository,
        private readonly distributionService: DistributionService,
        @Inject(forwardRef(() => TriggerService))
        private readonly triggerService: TriggerService,
        private readonly amoApiService: AmoApiService,
        private readonly logger: Logger
    ) {
        this.logger.log(`${WebhookQueueService.name} has been initialized`);
    }

    public async addTreatedTrigger(accountId: number, webhookDto: TreatedTriggerQueueItem): Promise<void> {
        try {
            await this.webhookQueueRepository.addTreatedTrigger(accountId, webhookDto);
        } catch (error) {
            const message = `Error while adding webhook in queue`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    private async treatTriggersQueueItem(webhook: TreatedTriggerPopulatedTrigger): Promise<void> {
        try {
            const accountId = webhook.trigger.account.id;

            if (webhook.trigger.template.isChangeLeadTasksResponsible) {
                await this.amoApiService.changeEntityTasksResponsible(accountId, 'leads', webhook.leadId, webhook.userAmoId);
            }

            await this.amoApiService.changeEntitiesResponsible(accountId, 'leads', [
                {
                    id: webhook.leadId,
                    responsible_user_id: webhook.userAmoId,
                },
            ]);

            if (
                !webhook.trigger.template.isChangeContactTasksResponsible &&
                !webhook.trigger.template.isChangeContactResponsible &&
                !webhook.trigger.template.isChangeCompanyResponsible
            ) {
                return;
            }

            const leadInfo = await this.amoApiService.getLeadInfo(accountId, webhook.leadId);

            const [mainContact] = leadInfo._embedded.contacts.filter((contact) => contact.is_main);

            if (webhook.trigger.template.isChangeContactResponsible && mainContact) {
                await this.amoApiService.changeEntitiesResponsible(accountId, 'contacts', [
                    {
                        id: mainContact.id,
                        responsible_user_id: webhook.userAmoId,
                    },
                ]);
            }

            if (webhook.trigger.template.isChangeContactTasksResponsible && mainContact) {
                await this.amoApiService.changeEntityTasksResponsible(accountId, 'contacts', mainContact.id, webhook.userAmoId);
            }

            const [linkedCompany] = leadInfo._embedded.companies;

            if (webhook.trigger.template.isChangeCompanyResponsible && linkedCompany) {
                await this.amoApiService.changeEntitiesResponsible(accountId, 'companies', [
                    {
                        id: linkedCompany.id,
                        responsible_user_id: webhook.userAmoId,
                    },
                ]);
            }
        } catch (error) {
            const message = `Error while treating webhook`;
            this.logger.error(message, error);
        }
    }

    public async treatTriggersQueue(accountId: number): Promise<void> {
        try {
            if (!this.readyWebhookQueueStatus[accountId]) {
                this.readyWebhookQueueStatus[accountId] = true;
                const { _id: queueId } = await this.webhookQueueRepository.getQueue(accountId);
                let webhook = await this.webhookQueueRepository.getTreatedTrigger(queueId);
                while (webhook) {
                    await this.treatTriggersQueueItem(webhook);
                    await this.webhookQueueRepository.pullTreatedTrigger(queueId, webhook._id);

                    webhook = await this.webhookQueueRepository.getTreatedTrigger(queueId);
                }
                this.readyWebhookQueueStatus[accountId] = false;
            }
        } catch (error) {
            const message = `Error while treating webhooks queue, with account: ${accountId}`;
            this.logger.error(message, error);
        }
    }

    public async addRedistributeTrigger(
        accountId: number,
        webhookDto: RedistributeTriggerQueueItem
    ): Promise<{ queueId: Types.ObjectId; webhookId: Types.ObjectId }> {
        try {
            return await this.webhookQueueRepository.addRedistributeTrigger(accountId, webhookDto);
        } catch (error) {
            const message = `Error while adding redistribute webhook in queue`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    private async treatWebhookQueueItem(webhook: WebhookQueueItemDocument): Promise<void> {
        try {
            this.logger.debug('treating webhook:', webhook);

            const accountId = webhook.accountId;
            const { id: leadId } = webhook.triggerData;

            const trigger = await this.triggerService.getWebhookTrigger(webhook);

            if (trigger.template.workTime && !this.distributionService.isWorkingTime(trigger.template.workTime)) {
                return;
            }

            const redistribute = trigger.template.redistributeByTimeSettings;

            if (redistribute && redistribute.workTimeSettings && !this.distributionService.isWorkingTime(redistribute.workTimeSettings)) {
                return;
            }

            if (trigger.template.isControlRepeatSales) {
                const entity = await this.amoApiService.getRepeatEntityResponsible(
                    webhook.accountId,
                    leadId,
                    trigger.template.isControlRepeatSales
                );

                if (entity && this.distributionService.validateEntityResponsible(trigger.distributionSettings, entity)) {
                    await this.addTreatedTrigger(accountId, {
                        leadId,
                        trigger: trigger._id,
                        userAmoId: entity.responsible_user_id,
                    });
                    return;
                }
            }

            const distribution = this.distributionService.getUserByDistributionType(trigger);
            this.logger.debug('distribution:', distribution);
            if (!distribution) {
                return;
            }

            const { distributionItem, userIndex, distributionSettings } = distribution;

            if (redistribute) {
                const redistributeWebhook = await this.addRedistributeTrigger(accountId, {
                    leadId,
                    trigger: trigger._id,
                    usersRefused: [distributionItem.user.userId],
                });

                this.logger.debug('redistributeWebhook', redistributeWebhook);
                // по сокету отправить запрос на принятие заявки
                // дальнейшая работа будет в вебсокет сервисе
                return;
            }

            const updatedSettings = distributionSettings.map((setting) => ({
                user: setting.user._id,
                weight: setting.weight,
            }));

            ++updatedSettings[userIndex].weight;

            await this.triggerService.updateTrigger(trigger._id, {
                distributionSettings: updatedSettings,
            });

            await this.addTreatedTrigger(accountId, {
                leadId,
                trigger: trigger._id,
                userAmoId: distributionItem.user.userId,
            });

            this.treatTriggersQueue(accountId);
        } catch (error) {
            const message = `Error while treating webhooks queue item, with account: ${webhook.accountId}`;
            this.logger.error(message, error);
        }
    }

    public async treatWebhooksQueue(accountId: number): Promise<void> {
        try {
            if (!this.webhookQueueStatus[accountId]) {
                this.webhookQueueStatus[accountId] = true;
                const { _id: queueId } = await this.webhookQueueRepository.getQueue(accountId);
                let webhook = await this.webhookQueueRepository.getWebhook(queueId);
                while (webhook) {
                    await this.treatWebhookQueueItem(webhook);
                    await this.webhookQueueRepository.pullWebhook(queueId, webhook._id);
                    webhook = await this.webhookQueueRepository.getWebhook(queueId);
                }
                this.webhookQueueStatus[accountId] = false;
            }
        } catch (error) {
            const message = `Error while treating triggers queue, with account: ${accountId}`;
            this.logger.error(message, error);
        }
    }

    public async addWebhookInQueue(webhookDto: WebhookQueueItem): Promise<void> {
        try {
            this.logger.debug('Adding webhook', webhookDto);
            await this.webhookQueueRepository.addWebhook(webhookDto.accountId, webhookDto);
        } catch (error) {
            const message = `Error while adding webhook in queue, with account: ${webhookDto.accountId}`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }
}
