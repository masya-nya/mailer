import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from 'src/core/logger/logger.service';
import { AccountRepository } from 'src/modules/account/account.repository';
import { CreateDistributionTemplateDto } from './dto/create-distribution-template.dto';
import { DistributionTemplatePopulatedUsers } from './distribution-template.model';
import { DistributionTemplateRepository } from './distribution-template.repository';
import { UpdateDistributionTemplateDto } from './dto/update-distribution-template.dto';
import handleError from 'src/core/helpers/handleError';
import { TriggerRepository } from '../triggers/trigger.repository';

@Injectable()
export class DistributionTemplateService {
    constructor(
        private readonly distributionTemplateRepository: DistributionTemplateRepository,
        private readonly accountRepository: AccountRepository,
        private readonly triggerRepository: TriggerRepository,
        private readonly logger: Logger
    ) {
        this.logger.log(`${DistributionTemplateService.name} has been initialized`);
    }

    public async createTemplate(
        accountId: number,
        templateDto: CreateDistributionTemplateDto
    ): Promise<DistributionTemplatePopulatedUsers> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            return await this.distributionTemplateRepository.createTemplate(account._id, templateDto);
        } catch (error) {
            const message = `Error while creating distribution template`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getAccountTemplates(accountId: number): Promise<DistributionTemplatePopulatedUsers[]> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            return await this.distributionTemplateRepository.getAccountTemplates(account._id);
        } catch (error) {
            const message = `Error while getting all account distribution templates`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async updateTemplate(
        accountId: number,
        updateTemplate: UpdateDistributionTemplateDto
    ): Promise<DistributionTemplatePopulatedUsers | null> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            const updatedTemplate = await this.distributionTemplateRepository.updateTemplate(account._id, updateTemplate);

            if (!updatedTemplate) {
                return updatedTemplate;
            }

            if (updateTemplate.distributionType) {
                const triggers = await this.triggerRepository.getTriggersByTemplate(updatedTemplate._id);

                if (triggers.length && triggers[0].distributionType !== updatedTemplate.distributionType) {
                    await this.triggerRepository.updateTriggers(
                        triggers.map((trigger) => trigger._id),
                        {
                            distributionType: updatedTemplate.distributionType,
                            distributionSettings: updatedTemplate.distributionSettings.map((settings) => ({
                                user: settings.user._id,
                                weight: 0,
                            })),
                        }
                    );
                }
            }

            return updatedTemplate;
        } catch (error) {
            const message = `Error while updating account distribution templates`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async deleteTemplates(accountId: number, templateIds: string[]): Promise<void> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            const triggers = await this.triggerRepository.getTriggersByTemplates(templateIds);

            if (triggers.length) {
                throw new HttpException(
                    {
                        message: 'Есть триггеры ссылающиеся на эти шаблоны. Удалите эти тригеры или измените в них шаблоны',
                        isDefinedError: true,
                    },
                    HttpStatus.BAD_REQUEST
                );
            }

            return await this.distributionTemplateRepository.deleteTemplates(account._id, templateIds);
        } catch (error) {
            const message = `Error while deleting distribution templates`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }
}
