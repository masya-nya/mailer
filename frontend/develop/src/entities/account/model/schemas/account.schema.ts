import { UserI } from 'src/entities/user/model/schemas/user.schema';

export interface AccountI {
	id:string;

	owner:string;
	
	login:string;

	name:string;

	users: string[] | UserI[];
}

export interface AccountPopulateI {
	owner: string,
	login: string,
	name: string,
}