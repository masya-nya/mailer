import { Types } from 'mongoose';
import { UserPopulateRDO } from 'src/modules/user/RDO/user.rdo';
import { UpdateRoleDTO } from '../DTO/update-roles.dto';
import { Role } from '../models/role.model';
import { ModelWithId } from 'src/core/types';
import { CreateRoleDTO } from '../DTO/create-role.dto';

export const formatingUserRDOArrayToObjectIdArray = (RDOArray: UserPopulateRDO[]): Types.ObjectId[] => {
	return (RDOArray).map((user) => new Types.ObjectId(user._id));
};

export const formatingRoleForUpdate = (roles: UpdateRoleDTO[]):ModelWithId<Role>[] => {
	return roles.map(role => {
		const usersObjectIds = formatingUserRDOArrayToObjectIdArray(role.users);
		return {
			...role,
			_id: new Types.ObjectId(role._id),
			accountId: new Types.ObjectId(role.accountId),
			users: usersObjectIds
		};
	});
};

export const formatingRoleForCreate = (roles: UpdateRoleDTO[]):CreateRoleDTO[] => {
	return roles.map(role => {
		console.log(role);
		const usersObjectIds = formatingUserRDOArrayToObjectIdArray(role.users);
		return {
			...role,
			accountId: new Types.ObjectId(role.accountId),
			users: usersObjectIds
		};
	});
};