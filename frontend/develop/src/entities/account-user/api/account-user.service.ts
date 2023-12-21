import { AxiosResponse } from 'axios';
import $api from 'src/app/http';
import ENDPOINTS from 'src/app/lib/consts/endpoints';
import { AccountUserI } from '../model/schemas/account-user.schema';
const { ACCOUNT_USER: { BASE } } = ENDPOINTS;

export class AccountUserService {
	
	static getAccountUser(userId: string, accountId: string): Promise<AxiosResponse<AccountUserI>> {
		return $api.get(`/${BASE}`, { params: { userId, accountId } });
	}
}