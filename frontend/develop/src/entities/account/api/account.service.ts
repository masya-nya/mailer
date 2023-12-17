import $api from 'src/app/http';
import { AccountI } from '../model/schemas/account.schema';
import { CreateAccountDTO } from '../model/DTO/create-account.dto';
import { AxiosResponse } from 'axios';
import ENDPOINTS from 'src/app/lib/consts/endpoints';
const { ACCOUNT: { BASE } } = ENDPOINTS;

export class AccountService {

	static async create(createAccountDTO: CreateAccountDTO): Promise<AxiosResponse<AccountI>> {
		return $api.post(`/${BASE}`, createAccountDTO);
	}

	static async getAccount(accountId: string): Promise<AxiosResponse<AccountI>> {
		return $api.get(`/${BASE}/${accountId}`);
	}

}
