import { Account } from 'src/modules/account/models/account.model';
import { PopulatedUser, UserDocument } from '../models/user.model';
import { Types } from 'mongoose';

export class UserRDO {
	readonly _id:string;

	readonly email:string;
	
	readonly isActivate:boolean;

	readonly isBanned:boolean;

	readonly accounts: Types.ObjectId[] | Account[];

	constructor(userDTO: UserDocument | PopulatedUser) {
		this._id = userDTO._id.toString();
		this.email = userDTO.email;
		this.isActivate = userDTO.isActivate;
		this.isBanned = userDTO.banned;
		this.accounts = userDTO.accounts;
	}
}

export const UserRDOForPopulate = {
	name: 1,
	email: 1,
	isActivate: 1,
	banned: 1,
};