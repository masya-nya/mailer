import { makeAutoObservable } from 'mobx';
import { AccountUserI } from '../schemas/account-user.schema';
import { AccountUserService } from '../../api/account-user.service';
import { EmailI } from 'src/entities/email';


export class AccountUserStore {
	private _accountUser: AccountUserI | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	get emails():EmailI[] {
		return this._accountUser?.emails || [];
	}

	get accountUser(): AccountUserI | null {
		return this._accountUser;
	}

	set accountUser(value: AccountUserI | null) {
		this._accountUser = value;
	}

	public async getAccountUser(userId: string, accountId: string):Promise<AccountUserI> {
		const { data: accountUser } = await AccountUserService.getAccountUser(userId, accountId);
		console.log('ACCOUNT-USER', accountUser);
		this._accountUser = accountUser;
		return accountUser;
	}
}

export const accountUserStore = new AccountUserStore();