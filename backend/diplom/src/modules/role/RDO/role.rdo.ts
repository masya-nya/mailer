import { Types } from 'mongoose';
import { User } from 'src/modules/user/user.model';
import { PopulatedRole, RoleDocument } from '../models/role.model';

export class RoleRDO {
	readonly id: string;

	readonly name: string;

	readonly accountId: string;
	
	readonly rights: string[];

	readonly users: Types.ObjectId[] | User[];

	constructor(roleDTO: RoleDocument | PopulatedRole) {
		this.id = roleDTO._id.toString();
		this.name = roleDTO.name;
		this.accountId = roleDTO.accountId.toString();
		this.rights = roleDTO.rights;
		this.users = roleDTO.users;
	}
}

export const RoleRDOForPopulate = {
	email: 1,
	isActivate: 1,
	banned: 1,
};