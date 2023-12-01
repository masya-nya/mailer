import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from '../account/account.model';
import { PopulatedModel } from 'src/core/types/populated-model.type';
import { APP_ENTITIES_SCHEMAS } from 'src/app/consts/schemas-entities.enum';

export type UserDocument = HydratedDocument<User>;

export type PopulationAccount = {
	accounts: Account[]
}

export type PopulatedUser = PopulatedModel<UserDocument, PopulationAccount>

@Schema()
export class User {

	@Prop({ type: String, required: true, unique: true })
	email: string;

	@Prop({ type: String, required: true })
	password: string;
	
	@Prop({ type: [Types.ObjectId], ref: APP_ENTITIES_SCHEMAS.ACCOUNT })
	accounts: Types.ObjectId[];
	
	@Prop({ type: Boolean, required: false, default: false })
	banned: boolean;
	
	@Prop({ type: Boolean, required: false, default: false })
	isActivate: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);