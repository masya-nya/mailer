import { Types } from 'mongoose';
import { Role } from '../models/role.model';

export enum RolesSystemNames {
	RECRUITE = 'recruite',
	ADMIN = 'admin',
}

export const SystemRolesNames: Record<RolesSystemNames, string> = {
	admin: 'АДМИНИСТРАТОР',
	recruite: 'ПОЛЬЗОВАТЕЛЬ',
};

export const getRecruiteRole = (
	accountId: Types.ObjectId,
	users?: Types.ObjectId[]
): Role => {
	return {
		accountId,
		name: 'ПОЛЬЗОВАТЕЛЬ',
		rights: [],
		users: users || [],
		systemName: RolesSystemNames.RECRUITE,
	};
};

export const getAdminRole = (
	accountId: Types.ObjectId,
	users?: Types.ObjectId[]
): Role => {
	return {
		accountId,
		name: 'АДМИНИСТРАТОР',
		rights: [
			'can_send',
			'can_add_email',
			'can_view_msg',
			'can_move_msg',
			'can_add_users',
			'can_read_unread',
		],
		users: users || [],
		systemName: RolesSystemNames.ADMIN,
	};
};
