import { AxiosResponse } from 'axios';
import $api from 'src/app/http';
import ENDPOINTS from 'src/app/lib/consts/endpoints';
import { RoleI } from '../model/schemas/role.schema';
import { UserPopulateI } from 'src/entities/user';
const { ROLE: { BASE } } = ENDPOINTS;

export class AccountRolesService {
	
	static getAccountRoles(accountId: string): Promise<AxiosResponse<RoleI<UserPopulateI>[]>> {
		return $api.get(`/${BASE}/${accountId}`);
	}
}