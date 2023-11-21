import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppModules } from 'src/app/constants/modules.enum';
import { Types } from 'mongoose';

@Schema()
export class RedistributeTriggerQueueItem {
    @Prop({ required: true })
    public usersRefused!: number[];

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: AppModules.Trigger,
    })
    public trigger!: Types.ObjectId;

    @Prop({ required: true })
    public leadId!: number;
}

export const RedistributeTriggerQueueItemSchema = SchemaFactory.createForClass(RedistributeTriggerQueueItem);
