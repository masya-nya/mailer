import { UserI } from 'src/entities/user/model/schemas/user.schema';

export interface AccountI {
	_id: string;

	owner: string;

	login: string;

	name: string;

	users: string[] | UserI[];
}

export interface AccountPopulateI {
	_id: string;

	owner: string;

	login: string;

	name: string;
}
