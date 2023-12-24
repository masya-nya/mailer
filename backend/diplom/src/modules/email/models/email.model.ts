import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import MailsInfo from 'src/core/consts/mailsinfo';

export type EmailDocument = HydratedDocument<Email>;

@Schema()
export class Email {
	@Prop({ required: true, type: String })
	serviceName: (typeof MailsInfo)[keyof typeof MailsInfo]['Service'];

	@Prop({ required: true })
	accountId: Types.ObjectId;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	photo: string;

	@Prop({ required: true })
	emailUserId: string;

	@Prop({ required: true })
	accessToken: string;

	@Prop({ required: true })
	refreshToken?: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
