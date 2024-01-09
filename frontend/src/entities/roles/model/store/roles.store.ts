import { makeAutoObservable } from 'mobx';
import { RoleI } from '../schemas/role.schema';
import { UserPopulateI } from 'src/entities/user';
import { AccountRolesService } from '../../api/roles.service';
import { RolesSystemNames } from '../../lib/config/system-roles';


export class AccountRolesStore {
	private _roles: RoleI<UserPopulateI>[] | null = null;

	private _currentDragUser: UserPopulateI | null = null;
	private _currentDragRole: RoleI<UserPopulateI> | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	get currentDragRole(): RoleI<UserPopulateI> | null {
		return this._currentDragRole;
	}

	set currentDragRole(value: RoleI<UserPopulateI>) {
		this._currentDragRole = value;
	}

	get currentDragUser(): UserPopulateI | null {
		return this._currentDragUser;
	}

	set currentDragUser(value: UserPopulateI) {
		this._currentDragUser = value;
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

	public async sendUpdateRoles(accountId: string):Promise<void> {
		if (this._roles) {
			const { data: roles } = await AccountRolesService.updateRoles(accountId, this._roles);
			console.log(roles);
		}
	}

	public deleteRole(deletedRole: RoleI<UserPopulateI>):void {
		if (this._roles) {
			if (deletedRole.users.length) {
				this._roles = this._roles.map(role => {
					if (role.systemName === RolesSystemNames.RECRUITE) {

						return {
							...role,
							users: [...role.users, ...deletedRole.users]
						};
					}
					return role;
				});
			}
			this._roles = this._roles.filter(role => role._id !== deletedRole._id);
		}
	}

	public updateRole(updatedRole: RoleI<UserPopulateI>):void {
		if (this._roles) {
			this._roles = this._roles.map(role => role._id === updatedRole._id ? updatedRole : role);
		}
	}

	public addRole(role: RoleI<UserPopulateI>):void {
		if (this._roles) {
			this._roles.push(role);
		}
	}
}

export const accountRolesStore = new AccountRolesStore();