import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {

	@Prop({ type: String, required: true, unique: true })
	refreshToken: string;

	@Prop({ type: Types.ObjectId, required: true, unique: true })
	userId: Types.ObjectId;
}
export const TokenSchema = SchemaFactory.createForClass(Token);