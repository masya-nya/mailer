import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account, AccountSchema } from './account.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountRepository } from './account.repository';
import { Logger } from '../../core/logger/logger.service';
import { AmoApiModule } from '../amo-api/amo-api.module';
import { UserRepository } from '../users/user.repository';
import { User, UserSchema } from '../users/user.model';
import { WorkSchedule, WorkScheduleSchema } from '../work-schedule/work-schedule.model';
import { WorkScheduleRepository } from '../work-schedule/work-schedule.repository';
import { DistributionTemplate, DistributionTemplateSchema } from '../distribution-templates/distribution-template.model';
import { Trigger, TriggerSchema } from '../triggers/trigger.model';
import { DistributionTemplateRepository } from '../distribution-templates/distribution-template.repository';
import { TriggerRepository } from '../triggers/trigger.repository';
import { WebhookQueueRepository } from '../webhook-queue/webhook-queue.repository';
import { WebhookQueue, WebhookQueueSchema } from '../webhook-queue/webhook-queue.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: WorkSchedule.name, schema: WorkScheduleSchema }]),
        MongooseModule.forFeature([{ name: DistributionTemplate.name, schema: DistributionTemplateSchema }]),
        MongooseModule.forFeature([{ name: DistributionTemplate.name, schema: DistributionTemplateSchema }]),
        MongooseModule.forFeature([{ name: Trigger.name, schema: TriggerSchema }]),
        MongooseModule.forFeature([{ name: WebhookQueue.name, schema: WebhookQueueSchema }]),
        AmoApiModule,
    ],
    controllers: [AccountController],
    providers: [
        AccountService,
        AccountRepository,
        UserRepository,
        WorkScheduleRepository,
        DistributionTemplateRepository,
        TriggerRepository,
        WebhookQueueRepository,
        Logger,
    ],
})
export class AccountModule {}
