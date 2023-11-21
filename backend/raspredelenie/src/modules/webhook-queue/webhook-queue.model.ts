import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelDocument } from 'src/core/types/model-document.type';
import { PopulatedModel } from 'src/core/types/populated.type';
import { TriggerPopulatedTemplateAndSettings } from '../triggers/trigger.model';
import { WebhookQueueItem, WebhookQueueItemSchema } from './types/webhook-queue-item.type';
import { TreatedTriggerQueueItem, TreatedTriggerQueueItemSchema } from './types/treated-trigger-queue-item.type';
import { RedistributeTriggerQueueItem, RedistributeTriggerQueueItemSchema } from './types/redistribute-trigger-queue-item.type';

export type WebhookQueueDocument = ModelDocument<WebhookQueue>;
export type WebhookQueueItemDocument = ModelDocument<WebhookQueueItem>;
export type TreatedTriggerQueueItemDocument = ModelDocument<TreatedTriggerQueueItem>;
export type TreatedRedistributeTriggerQueueItemDocument = ModelDocument<RedistributeTriggerQueueItem>;

export type WebhookPopulationType = {
    trigger: TriggerPopulatedTemplateAndSettings;
};
export type TreatedTriggerPopulatedTrigger = PopulatedModel<TreatedTriggerQueueItemDocument, WebhookPopulationType>;
export type TreatedRedistributeTriggerPopulatedTrigger = PopulatedModel<TreatedRedistributeTriggerQueueItemDocument, WebhookPopulationType>;
export type WebhookQueuePopulationType = PopulatedModel<
    WebhookQueueDocument,
    {
        treatedTriggers: TreatedTriggerPopulatedTrigger[];
        redistributeTriggers: TreatedRedistributeTriggerPopulatedTrigger[];
    }
>;

@Schema()
export class WebhookQueue {
    @Prop({ required: true })
    public accountId!: number;

    @Prop({ required: true, type: [WebhookQueueItemSchema] })
    public webhooks!: WebhookQueueItemDocument[];

    @Prop({ required: true, type: [TreatedTriggerQueueItemSchema] })
    public treatedTriggers!: TreatedTriggerQueueItemDocument[];

    @Prop({ required: true, type: [RedistributeTriggerQueueItemSchema] })
    public redistributeTriggers!: TreatedRedistributeTriggerQueueItemDocument[];
}

export const WebhookQueueSchema = SchemaFactory.createForClass(WebhookQueue);
