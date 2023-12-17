import { makeAutoObservable } from 'mobx';
import { AccountI } from '../schemas/account.schema';
import { AccountService } from '../../api/account.service';
import { CreateAccountDTO } from '../DTO/create-account.dto';

export class AccountStore {
	private _account: AccountI | null = null;

	get account(): AccountI | null {
		return this._account;
	}

	set account(value: AccountI) {
		this._account = value;
	}

	constructor() {
		makeAutoObservable(this);
	}

	public async createAccount(createAccountDTO: CreateAccountDTO): Promise<boolean> {
		const { data: account } = await AccountService.create(createAccountDTO);
		console.log(account);
		return true;
	}
}

export const accountStore = new AccountStore();