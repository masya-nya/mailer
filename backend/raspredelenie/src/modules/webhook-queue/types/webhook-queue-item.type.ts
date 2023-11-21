import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TriggerData } from 'src/modules/triggers/dto/trigger-data.dto';
import { TriggerInfo } from 'src/modules/triggers/dto/trigger-info.dto';

@Schema()
export class WebhookQueueItem {
    @Prop({ required: true })
    public subdomain!: string;

    @Prop({ required: true })
    public accountId!: number;

    @Prop({ required: true })
    public triggerData!: TriggerData;

    @Prop({ required: true })
    public triggerInfo!: TriggerInfo;
}

export const WebhookQueueItemSchema = SchemaFactory.createForClass(WebhookQueueItem);
