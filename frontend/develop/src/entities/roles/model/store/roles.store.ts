import { makeAutoObservable } from 'mobx';
import { RoleI } from '../schemas/role.schema';
import { UserPopulateI } from 'src/entities/user';
import { AccountRolesService } from '../../api/roles.service';


export class AccountRolesStore {
	private _roles: RoleI<UserPopulateI>[] | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	get roles(): RoleI<UserPopulateI>[] | null {
		return this._roles;
	}

	set roles(value: RoleI<UserPopulateI>[]) {
		this._roles = value;
	}

	public async getAccountRoles(accountId: string):Promise<RoleI<UserPopulateI>[]> {
		const { data: accountRoles } = await AccountRolesService.getAccountRoles(accountId);
		this._roles = accountRoles;
		return accountRoles;
	}
}

export const accountRolesStore = new AccountRolesStore();