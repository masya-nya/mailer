import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MarkedMails {
    @Prop({ required: true })
    public email: string;

    @Prop({ required: true })
    public msgId: string;

    @Prop({ required: true })
    public msgSeq: number;

    @Prop({ required: true })
    public markIds: string[];
}

export const MarkedMailsSchema = SchemaFactory.createForClass(MarkedMails);
