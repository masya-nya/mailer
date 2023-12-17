import { makeAutoObservable } from 'mobx';
import { AccountUserI } from '../schemas/account-user.schema';
import { AccountUserService } from '../../api/account-user.service';


export class AccountUserStore {
	private _accountUser: AccountUserI | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	get accountUser(): AccountUserI | null {
		return this._accountUser;
	}

	set accountUser(value: AccountUserI) {
		this._accountUser = value;
	}

	public async getAccountUser(email: string, accountId: string):Promise<AccountUserI> {
		const { data: accountUser } = await AccountUserService.getAccountUser(email, accountId);
		this._accountUser = accountUser;
		return accountUser;
	}
}

export const accountUserStore = new AccountUserStore();