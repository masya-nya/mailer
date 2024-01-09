import { AccountPopulateI } from 'src/entities/account/model/schemas/account.schema';

export interface UserI {
	_id:string;

	email:string;
	
	isActivate:boolean;

	isBanned:boolean;

	accounts: AccountPopulateI[];
}

export interface UserPopulateI {
	name: string
	email: string
	isActivate: boolean
	banned: boolean
}