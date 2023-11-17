import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/user/user.model";

export type AccountDocument = HydratedDocument<Account>;

export type PopulatedModel<T, U> = Omit<T, keyof U> & U;

export type PouplationUser = {
	users: User[]
}

export type PopulatedAccount = PopulatedModel<Account, PouplationUser>

@Schema()
export class Account {

	@Prop({ type: String, required: true })
	owner: string;

	@Prop({ type: String })
	code: string;
	
	@Prop({ type: [Types.ObjectId], ref: User.name })
	users: Types.ObjectId[];

}

export const AccountSchema = SchemaFactory.createForClass(Account);