import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from 'src/core/logger/logger.service';
import { Trigger, TriggerSchema } from './trigger.model';
import { TriggerRepository } from './trigger.repository';
import { TriggerService } from './trigger.service';
import { TriggerController } from './trigger.controller';
import { DistributionTemplate, DistributionTemplateSchema } from 'src/modules/distribution-templates/distribution-template.model';
import { Account, AccountSchema } from 'src/modules/account/account.model';
import { AccountRepository } from 'src/modules/account/account.repository';
import { DistributionTemplateRepository } from 'src/modules/distribution-templates/distribution-template.repository';
import { WebhookQueueModule } from '../webhook-queue/webhook-queue.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Trigger.name, schema: TriggerSchema }]),
        MongooseModule.forFeature([{ name: DistributionTemplate.name, schema: DistributionTemplateSchema }]),
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        forwardRef(() => WebhookQueueModule),
    ],
    controllers: [TriggerController],
    providers: [TriggerService, TriggerRepository, DistributionTemplateRepository, AccountRepository, Logger],
    exports: [TriggerService],
})
export class TriggerModule {}
