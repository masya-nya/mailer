import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account extends Document {
    @Prop({ required: true })
    public id: number;

    @Prop({ required: true })
    public accessToken: string;

    @Prop({ required: true })
    public refreshToken: string;

    @Prop({ required: true })
    public subdomain: string;

    @Prop({ required: true, default: true })
    public installed: boolean;

    @Prop({ required: true })
    public startUsingDate: string;

    @Prop({ required: true })
    public finishTrialDate: string;

    @Prop({ required: false, default: '' })
    public finishPaymentDate: string;

    @Prop({ required: true, default: true })
    public isTrial: boolean;

    @Prop({ required: true, default: false })
    public isPaid: boolean;

    @Prop({ required: true, default: true })
    public isActive: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
