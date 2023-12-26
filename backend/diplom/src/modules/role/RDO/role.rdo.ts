import { Types } from 'mongoose';
import { User } from 'src/modules/user/models/user.model';
import { PopulatedRole, RoleDocument } from '../models/role.model';

export class RoleRDO {
	readonly _id: string;

	readonly name: string;

	readonly accountId: string;
	
	readonly rights: string[];

	readonly users: Types.ObjectId[] | User[];

	constructor(roleDTO: RoleDocument | PopulatedRole) {
		this._id = roleDTO._id.toString();
		this.name = roleDTO.name;
		this.accountId = roleDTO.accountId.toString();
		this.rights = roleDTO.rights;
		this.users = roleDTO.users;
	}
}

export const RoleRDOForPopulate = {
	name: 1,
	accountId: 1,
	rights: 1,
};