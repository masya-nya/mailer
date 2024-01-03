import { Types } from 'mongoose';
import { AccountDocument, PopulatedAccount } from '../models/account.model';
import { UserPopulateRDO } from 'src/modules/user/RDO/user.rdo';

export class AccountRDO {
	readonly _id:string;

	readonly owner:string;
	
	readonly login:string;

	readonly name:string;

	readonly users: (Types.ObjectId | UserPopulateRDO<Types.ObjectId>)[];

	constructor(AccountDTO: AccountDocument | PopulatedAccount) {
		this._id = AccountDTO._id.toString();
		this.owner = AccountDTO.owner;
		this.login = AccountDTO.login;
		this.name = AccountDTO.name;
		this.users = AccountDTO.users;
	}
}

export class AccountPopulateRDO<T = string> {
	readonly _id: T;

	readonly name: string;

	readonly accountId: string;

	readonly rights: string[];
}

export const AccountRDOForPopulate = {
	_id: 1,
	owner: 1,
	login: 1,
	name: 1,
};