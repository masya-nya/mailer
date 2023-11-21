import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from 'src/core/logger/logger.service';
import {
    TreatedTriggerQueueItemDocument,
    TreatedRedistributeTriggerQueueItemDocument,
    WebhookQueue,
    WebhookQueueDocument,
    WebhookQueuePopulationType,
    TreatedTriggerPopulatedTrigger,
    TreatedRedistributeTriggerPopulatedTrigger,
    WebhookQueueItemDocument,
} from './webhook-queue.model';
import { Model, Types } from 'mongoose';
import handleError from 'src/core/helpers/handleError';
import { TreatedTriggerQueueItem } from './types/treated-trigger-queue-item.type';
import { RedistributeTriggerQueueItem } from './types/redistribute-trigger-queue-item.type';
import { WebhookQueueItem } from './types/webhook-queue-item.type';

@Injectable()
export class WebhookQueueRepository {
    constructor(
        @InjectModel(WebhookQueue.name) private readonly webhookQueueModel: Model<WebhookQueue>,
        private readonly logger: Logger
    ) {
        this.logger.log(`${WebhookQueueRepository.name} has been initialized`);
    }

    public async getQueue(accountId: number): Promise<WebhookQueueDocument> {
        try {
            const queue = await this.webhookQueueModel.findOne({ accountId }).lean();
            if (!queue) {
                throw new Error('Queue not found');
            }
            return queue;
        } catch (error) {
            const message = `Error while getting queue`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async createQueue(accountId: number): Promise<WebhookQueueDocument> {
        try {
            const queue = await this.webhookQueueModel.findOne({ accountId }).lean();
            if (!queue) {
                return await this.webhookQueueModel.create({
                    accountId,
                    webhooks: [],
                    treatedTriggers: [],
                    redistributeTriggers: [],
                });
            }
            return queue;
        } catch (error) {
            const message = `Error while getting queue`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async deleteAccountWebhookQueues(accountId: number): Promise<void> {
        try {
            await this.webhookQueueModel.deleteOne({ accountId });
        } catch (error) {
            const message = `Error while deleting account queues from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async addWebhook(accountId: number, webhookDto: WebhookQueueItem): Promise<void> {
        try {
            const queue = await this.webhookQueueModel.findOne({ accountId }).lean();
            if (queue) {
                await this.webhookQueueModel.updateOne(
                    { accountId },
                    {
                        $push: {
                            webhooks: webhookDto,
                        },
                    }
                );
            } else {
                await this.webhookQueueModel.create({
                    accountId,
                    webhooks: [webhookDto],
                    treatedTriggers: [],
                    redistributeTriggers: [],
                });
            }
        } catch (error) {
            const message = `Error while adding webhook in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getWebhook(queueId: Types.ObjectId): Promise<WebhookQueueItemDocument | null> {
        try {
            const webhookQueue = await this.webhookQueueModel.findById(queueId);
            if (webhookQueue && webhookQueue.webhooks.length) {
                return webhookQueue.webhooks[0];
            }
            return null;
        } catch (error) {
            const message = `Error getting webhook from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async pullWebhook(queueId: Types.ObjectId, webhookId: Types.ObjectId): Promise<WebhookQueueItemDocument | null> {
        try {
            const webhookQueue = await this.webhookQueueModel.findByIdAndUpdate(queueId, {
                $pull: {
                    webhooks: { _id: webhookId },
                },
            });
            if (webhookQueue && webhookQueue.webhooks.length) {
                return webhookQueue.webhooks.find((webhook) => webhook._id.toString() === webhookId.toString()) || null;
            }
            return null;
        } catch (error) {
            const message = `Error while pulling webhook from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async addTreatedTrigger(accountId: number, webhookDto: TreatedTriggerQueueItem): Promise<void> {
        try {
            const webhook = await this.webhookQueueModel.findOne({ accountId }).lean();
            if (webhook) {
                await this.webhookQueueModel.updateOne(
                    { accountId },
                    {
                        $push: {
                            treatedTriggers: webhookDto,
                        },
                    }
                );
            } else {
                await this.webhookQueueModel.create({
                    accountId,
                    treatedTriggers: [webhookDto],
                    webhooks: [],
                    redistributeTriggers: [],
                });
            }
        } catch (error) {
            const message = `Error while adding treated trigger in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getTreatedTrigger(queueId: Types.ObjectId): Promise<TreatedTriggerPopulatedTrigger | null> {
        try {
            const webhookQueue = await this.webhookQueueModel
                .findById(queueId)
                .populate<WebhookQueuePopulationType>([
                    {
                        path: 'treatedTriggers.trigger',
                        model: 'Trigger',
                        populate: [
                            {
                                path: 'template',
                                model: 'DistributionTemplate',
                                populate: {
                                    path: 'distributionSettings.user',
                                    model: 'User',
                                    populate: {
                                        path: 'workSchedule',
                                        model: 'WorkSchedule',
                                    },
                                },
                            },
                            {
                                path: 'account',
                            },
                            {
                                path: 'distributionSettings.user',
                                model: 'User',
                                populate: {
                                    path: 'workSchedule',
                                    model: 'WorkSchedule',
                                },
                            },
                        ],
                    },
                ])
                .exec();
            if (webhookQueue && webhookQueue.treatedTriggers.length) {
                return webhookQueue.treatedTriggers[0];
            }
            return null;
        } catch (error) {
            const message = `Error getting treated trigger from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async pullTreatedTrigger(queueId: Types.ObjectId, webhookId: Types.ObjectId): Promise<TreatedTriggerQueueItemDocument | null> {
        try {
            const webhookQueue = await this.webhookQueueModel.findByIdAndUpdate(queueId, {
                $pull: {
                    treatedTriggers: { _id: webhookId },
                },
            });
            if (webhookQueue && webhookQueue.treatedTriggers.length) {
                return webhookQueue.treatedTriggers.find((webhook) => webhook._id.toString() === webhookId.toString()) || null;
            }
            return null;
        } catch (error) {
            const message = `Error while pulling treated trigger from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async addRedistributeTrigger(
        accountId: number,
        webhookDto: RedistributeTriggerQueueItem
    ): Promise<{ queueId: Types.ObjectId; webhookId: Types.ObjectId }> {
        try {
            const webhookQueue = await this.webhookQueueModel.findOne({ accountId }).lean();
            if (webhookQueue) {
                const updatedWebhook = await this.webhookQueueModel.findByIdAndUpdate(
                    webhookQueue._id,
                    {
                        $push: {
                            redistributeTriggers: webhookDto,
                        },
                    },
                    {
                        new: true,
                    }
                );

                return {
                    queueId: updatedWebhook._id,
                    webhookId: updatedWebhook.redistributeTriggers.at(-1)._id,
                };
            } else {
                const createdWebhookQueue = await this.webhookQueueModel.create({
                    accountId,
                    redistributeTriggers: [webhookDto],
                    webhooks: [],
                    treatedTriggers: [],
                });

                return {
                    queueId: createdWebhookQueue._id,
                    webhookId: createdWebhookQueue.redistributeTriggers[0]._id,
                };
            }
        } catch (error) {
            const message = `Error while adding redistribute trigger in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getRedistributeTrigger(
        queueId: Types.ObjectId,
        webhookId: Types.ObjectId
    ): Promise<TreatedRedistributeTriggerPopulatedTrigger | null> {
        try {
            const webhookQueue = await this.webhookQueueModel
                .findById(queueId)
                .populate<WebhookQueuePopulationType>([
                    {
                        path: 'redistributeTriggers.trigger',
                        model: 'Trigger',
                        populate: [
                            {
                                path: 'template',
                                model: 'DistributionTemplate',
                                populate: {
                                    path: 'distributionSettings.user',
                                    model: 'User',
                                    populate: {
                                        path: 'workSchedule',
                                        model: 'WorkSchedule',
                                    },
                                },
                            },
                            {
                                path: 'account',
                            },
                            {
                                path: 'distributionSettings.user',
                                model: 'User',
                                populate: {
                                    path: 'workSchedule',
                                    model: 'WorkSchedule',
                                },
                            },
                        ],
                    },
                ])
                .exec();
            if (webhookQueue && webhookQueue.redistributeTriggers.length) {
                return webhookQueue.redistributeTriggers.find((webhook) => webhook._id.toString() === webhookId.toString()) || null;
            }
            return null;
        } catch (error) {
            const message = `Error while getting redistribute trigger from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async pullRedistributeTrigger(
        queueId: Types.ObjectId,
        webhookId: Types.ObjectId
    ): Promise<TreatedRedistributeTriggerQueueItemDocument | null> {
        try {
            const webhookQueue = await this.webhookQueueModel.findByIdAndUpdate(queueId, {
                $pull: {
                    redistributeTriggers: { _id: webhookId },
                },
            });
            if (webhookQueue && webhookQueue.redistributeTriggers.length) {
                return webhookQueue.redistributeTriggers.find((webhook) => webhook._id.toString() === webhookId.toString()) || null;
            }
            return null;
        } catch (error) {
            const message = `Error while pulling redistribute trigger from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async addUserRefusedToRedistributeTrigger(queueId: Types.ObjectId, webhookId: Types.ObjectId, userId: number): Promise<boolean> {
        try {
            const webhookQueue = await this.webhookQueueModel.findByIdAndUpdate(
                queueId,
                {
                    $addToSet: {
                        'redistributeTriggers.$[hook].usersRefused': userId,
                    },
                },
                {
                    arrayFilters: [
                        {
                            'hook._id': webhookId,
                        },
                    ],
                }
            );
            return webhookQueue && webhookQueue.redistributeTriggers.some((webhook) => webhook._id.toString() === webhookId.toString());
        } catch (error) {
            const message = `Error while adding user refused in redistribute webhook in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }
}
