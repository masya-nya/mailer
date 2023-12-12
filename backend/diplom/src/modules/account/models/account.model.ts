import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/models/user.model';
import { PopulatedModel } from 'src/core/types/populated-model.type';
import { APP_ENTITIES_SCHEMAS } from 'src/app/consts/schemas-entities.enum';

export type AccountDocument = HydratedDocument<Account>;

export type PopulationUser = {
	users: User[]
}

export type PopulatedAccount = PopulatedModel<AccountDocument, PopulationUser>

@Schema()
export class Account {

	@Prop({ type: String, required: true })
	owner: string;
	
	@Prop({ type: String, required: true })
	login: string;

	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: String })
	code: string;
	
	@Prop({ type: [Types.ObjectId], ref: APP_ENTITIES_SCHEMAS.USER })
	users: Types.ObjectId[];

}

export const AccountSchema = SchemaFactory.createForClass(Account);