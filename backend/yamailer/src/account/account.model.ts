import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
    @Prop({ required: true })
    public id: number;

    @Prop({ required: true })
    public accessToken: string;

    @Prop({ required: true })
    public refreshToken: string;

    @Prop({ required: true })
    public subdomain: string;

    @Prop({ required: true })
    public installed: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
