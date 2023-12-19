import { Types } from 'mongoose';
import { Role } from '../models/role.model';

export const getRecruiteRole = (accountId: Types.ObjectId, users?: Types.ObjectId[]):Role => {
	return {
		accountId,
		name: 'ПОЛЬЗОВАТЕЛЬ',
		rights: [],
		users: users || []
	};
};

export const getAdminRole = (accountId: Types.ObjectId, users?: Types.ObjectId[]):Role => {
	return {
		accountId,
		name: 'АДМИНИСТРАТОР',
		rights: [],
		users: users || []
	};
};