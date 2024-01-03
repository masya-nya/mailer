import { AxiosResponse } from 'axios';
import $api from 'src/app/http';
import ENDPOINTS from 'src/app/lib/consts/endpoints';
import { RoleI } from '../model/schemas/role.schema';
import { UserPopulateI } from 'src/entities/user';
import { StatusResponseType } from 'src/shared/lib';
import { DeleteRoleDTO } from '../model/DTO/delete-role.dto';
const { ROLE: { BASE, DELETE_ROLE } } = ENDPOINTS;

export class AccountRolesService {
	
	static getAccountRoles(accountId: string): Promise<AxiosResponse<RoleI<UserPopulateI>[]>> {
		return $api.get(`/${BASE}/${accountId}`);
	}

	static updateRoles(accountId: string, roles: RoleI<UserPopulateI>[]): Promise<AxiosResponse<RoleI<UserPopulateI>[]>> {
		return $api.patch(`/${BASE}`, {
			accountId,
			roles
		});
	}

	static deleteRole(deleteRoleDTO: DeleteRoleDTO): Promise<AxiosResponse<StatusResponseType>> {
		return $api.delete(`/${BASE}/${DELETE_ROLE}`, {
			data: {
				...deleteRoleDTO
			}
		});
	}
}