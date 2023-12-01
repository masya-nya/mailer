import { Account } from 'src/modules/account/account.model';
import { PopulatedUser, UserDocument } from '../user.model';
import { Types } from 'mongoose';

export class UserRDO {
	readonly id:string;

	readonly email:string;
	
	readonly isActivate:boolean;

	readonly isBanned:boolean;

	readonly accounts: Types.ObjectId[] | Account[];

	constructor(userDTO: UserDocument | PopulatedUser) {
		this.id = userDTO._id.toString();
		this.email = userDTO.email;
		this.isActivate = userDTO.isActivate;
		this.isBanned = userDTO.banned;
		this.accounts = userDTO.accounts;
	}
}