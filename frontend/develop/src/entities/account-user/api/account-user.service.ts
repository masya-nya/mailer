import { AxiosResponse } from 'axios';
import $api from 'src/app/http';
import ENDPOINTS from 'src/app/lib/consts/endpoints';
import { AccountUserI } from '../model/schemas/account-user.schema';
const { ACCOUNT_USER: { BASE } } = ENDPOINTS;

export class AccountUserService {
	
	static getAccountUser(email: string, accountId: string): Promise<AxiosResponse<AccountUserI>> {
		return $api.get(`/${BASE}`, { params: { email, accountId } });
	}
}