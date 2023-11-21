import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from 'src/core/logger/logger.service';
import { DistributionTemplateController } from './distribution-template.controller';
import { DistributionTemplate, DistributionTemplateSchema } from './distribution-template.model';
import { DistributionTemplateService } from './distribution-template.service';
import { DistributionTemplateRepository } from './distribution-template.repository';
import { AccountRepository } from 'src/modules/account/account.repository';
import { Account, AccountSchema } from 'src/modules/account/account.model';
import { TriggerRepository } from 'src/modules/triggers/trigger.repository';
import { Trigger, TriggerSchema } from 'src/modules/triggers/trigger.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: DistributionTemplate.name, schema: DistributionTemplateSchema }]),
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        MongooseModule.forFeature([{ name: Trigger.name, schema: TriggerSchema }]),
    ],
    controllers: [DistributionTemplateController],
    providers: [DistributionTemplateService, DistributionTemplateRepository, AccountRepository, TriggerRepository, Logger],
})
export class DistributionTemplateModule {}
