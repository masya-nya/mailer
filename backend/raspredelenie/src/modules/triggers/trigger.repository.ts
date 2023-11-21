import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import handleError from 'src/core/helpers/handleError';
import { Logger } from 'src/core/logger/logger.service';
import { UpdateTriggerInfo } from './dto/update-trigger.dto';
import { Trigger, TriggerDocument, TriggerPopulatedTemplateAndSettings, TriggerPopulationType } from './trigger.model';

@Injectable()
export class TriggerRepository {
    constructor(
        @InjectModel(Trigger.name) private readonly triggerModel: Model<Trigger>,
        private readonly logger: Logger
    ) {
        this.logger.log(`${TriggerRepository.name} has been initialized`);
    }

    public async createTrigger(trigger: Trigger): Promise<TriggerDocument> {
        try {
            return await this.triggerModel.create(trigger);
        } catch (error) {
            const message = `Error while creating trigger in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async update(triggerId: Types.ObjectId, updateOptions: UpdateTriggerInfo): Promise<TriggerDocument> {
        try {
            const foundTrigger = await this.triggerModel.findById(triggerId);

            if (!foundTrigger) {
                throw new HttpException('Trigger not found', HttpStatus.NOT_FOUND);
            }

            const trigger = await this.triggerModel.findByIdAndUpdate(triggerId, updateOptions, { new: true }).lean();

            return trigger;
        } catch (error) {
            const message = `Error while updating trigger in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async updateTriggers(triggerIds: Types.ObjectId[], updateOptions: UpdateTriggerInfo): Promise<TriggerDocument[]> {
        try {
            await this.triggerModel.updateMany({ _id: { $in: triggerIds } }, updateOptions);

            const triggers = await this.triggerModel.find({ _id: { $in: triggerIds } });
            return triggers;
        } catch (error) {
            const message = `Error while updating trigger in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getTrigger(triggerId: Types.ObjectId): Promise<TriggerDocument | null> {
        try {
            return await this.triggerModel.findById(triggerId).lean();
        } catch (error) {
            const message = `Error while getting trigger from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getTriggersByTemplate(templateId: Types.ObjectId): Promise<TriggerDocument[]> {
        try {
            return await this.triggerModel.find({ template: templateId }).lean();
        } catch (error) {
            const message = `Error while getting triggers by template id from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getTriggersByTemplates(templateIds: string[]): Promise<TriggerDocument[]> {
        try {
            return await this.triggerModel.find({ template: { $in: templateIds } }).lean();
        } catch (error) {
            const message = `Error while getting triggers by templates ids from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async deleteTrigger(triggerId: Types.ObjectId): Promise<void> {
        try {
            await this.triggerModel.deleteOne({ _id: triggerId });
        } catch (error) {
            const message = `Error while deleting trigger from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async deleteAccountTriggers(accountId: string): Promise<void> {
        try {
            await this.triggerModel.deleteMany({ account: accountId });
        } catch (error) {
            const message = `Error while deleting account triggers from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getTriggerByUuid(triggerUuid: string): Promise<TriggerDocument | null> {
        try {
            const trigger = await this.triggerModel.findOne({ triggerUuid });
            return trigger;
        } catch (error) {
            const message = `Error while getting trigger by trigger uuid`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getTriggerByUuidPopulated(triggerUuid: string): Promise<TriggerPopulatedTemplateAndSettings | null> {
        try {
            const trigger = await this.triggerModel
                .findOne({ triggerUuid })
                .populate<TriggerPopulationType>([
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
                ])
                .exec();
            return trigger;
        } catch (error) {
            const message = `Error while getting populated trigger by trigger uuid`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async deleteTriggersByUuid(accountId: Types.ObjectId, triggerUuids: string[]): Promise<void> {
        try {
            await this.triggerModel.deleteMany({ account: accountId, triggerUuid: { $in: triggerUuids } });
        } catch (error) {
            const message = `Error while deleting triggers by uuids from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }
}
