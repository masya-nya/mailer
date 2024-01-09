import { Types } from 'mongoose';
import { PopulatedRole, RoleDocument } from '../models/role.model';
import { UserPopulateRDO } from 'src/modules/user/RDO/user.rdo';
import { RolesSystemNames } from '../patterns';

export class RoleRDO {
	readonly _id: string;

	readonly name: string;

	readonly accountId: string;
	
	readonly rights: string[];

	readonly systemName: RolesSystemNames | null;

	readonly users: Types.ObjectId[] | UserPopulateRDO<Types.ObjectId>[];

	constructor(roleDTO: RoleDocument | PopulatedRole) {
		this._id = roleDTO._id.toString();
		this.name = roleDTO.name;
		this.accountId = roleDTO.accountId.toString();
		this.rights = roleDTO.rights;
		this.users = roleDTO.users;
		this.systemName = roleDTO.systemName || null;
	}
}

export class RolePopulateRDO<T = string> {
	readonly _id: T;

	readonly name: string;

	readonly accountId: string;

	readonly rights: string[];
}

export const RoleRDOForPopulate = {
	_id: 1,
	name: 1,
	accountId: 1,
	rights: 1,
};