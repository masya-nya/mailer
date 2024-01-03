import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { APP_ENTITIES_SCHEMAS } from 'src/app/consts/schemas-entities.enum';
import { PopulatedModel } from 'src/core/types';
import { RolesSystemNames } from '../patterns';
import { UserPopulateRDO } from 'src/modules/user/RDO/user.rdo';

export type RoleDocument = HydratedDocument<Role>;

export type PopulationUser = {
	users: UserPopulateRDO<Types.ObjectId>[]
}

export type PopulatedRole = PopulatedModel<RoleDocument, PopulationUser>

@Schema()
export class Role {

	@Prop({ type: String, required: true })
	name: string;
	
	@Prop({ type: Types.ObjectId, required: true, ref: APP_ENTITIES_SCHEMAS.ACCOUNT })
	accountId: Types.ObjectId;
	
	@Prop({ type: [String], required: true })
	rights: string[];

	@Prop({ type: [Types.ObjectId], default: [], ref: APP_ENTITIES_SCHEMAS.USER })
	users: Types.ObjectId[];

	@Prop({ type: String })
	systemName?: RolesSystemNames;
}
export const RoleSchema = SchemaFactory.createForClass(Role);