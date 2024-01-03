import { UserPopulateI } from 'src/entities/user';
import { RoleI } from '../..';
import { v4 as uuidv4 } from 'uuid';

export const getNewRolePattern = (accountId: string): RoleI<UserPopulateI> => {
	return {
		_id: uuidv4(),
		accountId,
		name: 'Название роли',
		rights: [],
		users: []
	};
};