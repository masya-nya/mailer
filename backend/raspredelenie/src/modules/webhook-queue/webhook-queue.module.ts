import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookQueue, WebhookQueueSchema } from './webhook-queue.model';
import { AmoApiModule } from '../amo-api/amo-api.module';
import { Logger } from 'src/core/logger/logger.service';
import { WebhookQueueRepository } from './webhook-queue.repository';
import { WebhookQueueService } from './webhook-queue.service';
import { DistributionService } from '../distribution/distribution.service';
import { TriggerModule } from '../triggers/trigger.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: WebhookQueue.name, schema: WebhookQueueSchema }]),
        forwardRef(() => TriggerModule),
        AmoApiModule,
    ],
    providers: [WebhookQueueRepository, WebhookQueueService, DistributionService, Logger],
    exports: [WebhookQueueService],
})
export class WebhookQueueModule {}
