import { AccountI } from 'src/entities/account/model/schemas/account.schema';

export interface UserI {
	id:string;

	email:string;
	
	isActivate:boolean;

	isBanned:boolean;

	accounts: string | AccountI[];
}

export interface UserPopulateI {
	email: string,
	isActivate: boolean,
	banned: boolean,
}