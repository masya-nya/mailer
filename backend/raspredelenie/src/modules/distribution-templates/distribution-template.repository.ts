import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Logger } from 'src/core/logger/logger.service';
import { CreateDistributionTemplateDto } from './dto/create-distribution-template.dto';
import {
    DistributionTemplate,
    DistributionTemplatePopulatedUsers,
    DistributionTemplatePopulationType,
} from './distribution-template.model';
import { UpdateDistributionTemplateDto } from './dto/update-distribution-template.dto';
import handleError from 'src/core/helpers/handleError';

@Injectable()
export class DistributionTemplateRepository {
    constructor(
        @InjectModel(DistributionTemplate.name) private readonly distributionTemplateModel: Model<DistributionTemplate>,
        private readonly logger: Logger
    ) {
        this.logger.log(`${DistributionTemplateRepository.name} has been initialized`);
    }

    public async createTemplate(
        accountMongoId: string,
        templateDto: CreateDistributionTemplateDto
    ): Promise<DistributionTemplatePopulatedUsers> {
        try {
            const createdTemplate = await this.distributionTemplateModel.create({
                account: new Types.ObjectId(accountMongoId),
                ...templateDto,
            });

            const template = await this.distributionTemplateModel
                .findById(createdTemplate._id)
                .populate<DistributionTemplatePopulationType>({
                    path: 'distributionSettings.user',
                    model: 'User',
                })
                .exec();

            return template;
        } catch (error) {
            const message = 'Error while creating distribution template in database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getTemplate(accountMongoId: string, id: string): Promise<DistributionTemplatePopulatedUsers | null> {
        try {
            const template = await this.distributionTemplateModel
                .findOne({ account: accountMongoId, _id: id })
                .populate<DistributionTemplatePopulationType>({
                    path: 'distributionSettings.user',
                    model: 'User',
                })
                .exec();
            return template || null;
        } catch (error) {
            const message = 'Error while getting distribution template from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getAccountTemplates(accountMongoId: Types.ObjectId): Promise<DistributionTemplatePopulatedUsers[]> {
        try {
            const templates = await this.distributionTemplateModel
                .find({ account: accountMongoId })
                .populate<DistributionTemplatePopulationType>({
                    path: 'distributionSettings.user',
                    model: 'User',
                })
                .exec();
            return templates;
        } catch (error) {
            const message = 'Error while getting all distribution templates from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async updateTemplate(
        accountMongoId: string,
        updateTemplateDto: UpdateDistributionTemplateDto
    ): Promise<DistributionTemplatePopulatedUsers | null> {
        try {
            const foundTemplate = await this.distributionTemplateModel.findOne({ _id: updateTemplateDto.id, account: accountMongoId });
            if (!foundTemplate) {
                throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
            }

            const updatedTemplate = await this.distributionTemplateModel
                .findOneAndUpdate({ _id: foundTemplate._id }, updateTemplateDto, { new: true })
                .populate<DistributionTemplatePopulationType>({
                    path: 'distributionSettings.user',
                    model: 'User',
                })
                .exec();

            return updatedTemplate || null;
        } catch (error) {
            const message = 'Error while updating distribution template in database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async deleteTemplates(accountMongoId: string, templateIds: string[]): Promise<void> {
        try {
            await this.distributionTemplateModel.deleteMany({ account: accountMongoId, _id: { $in: templateIds } });
        } catch (error) {
            const message = 'Error while deleting distribution templates in database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async deleteTemplatesByAccount(accountMongoId: string): Promise<void> {
        try {
            await this.distributionTemplateModel.deleteMany({ account: accountMongoId });
        } catch (error) {
            const message = 'Error while deleting account distribution templates in database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }
}
