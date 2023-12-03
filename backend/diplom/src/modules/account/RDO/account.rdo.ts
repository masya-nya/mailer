import { Types } from 'mongoose';
import { User } from 'src/modules/user/user.model';
import { AccountDocument, PopulatedAccount } from '../account.model';

export class AccountRDO {
	readonly id:string;

	readonly owner:string;
	
	readonly login:string;

	readonly name:string;

	readonly users: Types.ObjectId[] | User[];

	constructor(AccountDTO: AccountDocument | PopulatedAccount) {
		this.id = AccountDTO._id.toString();
		this.owner = AccountDTO.owner;
		this.login = AccountDTO.login;
		this.name = AccountDTO.name;
		this.users = AccountDTO.users;
	}
}

export const AccountRDOForPopulate = {
	owner: 1,
	login: 1,
	name: 1,
};