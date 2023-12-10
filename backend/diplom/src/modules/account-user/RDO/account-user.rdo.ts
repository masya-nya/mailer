import { Account, AccountDocument } from 'src/modules/account/account.model';
import { RoleDocument } from 'src/modules/role/models/role.model';
import { PopulatedUser } from 'src/modules/user/user.model';

export class AccountUserRDO {
	userId: string;

	email: string;

	accounts: Account[];

	isActivate: boolean;

	accountName: string;

	accountLogin: string;

	accountId: string;

	roleName: string;

	roleRights: string[];

	constructor(user: PopulatedUser, account: AccountDocument, role: RoleDocument) {
		this.userId = user._id.toString();
		this.email = user.email;
		this.accounts = user.accounts;
		this.isActivate = user.isActivate;
		this.accountName = account.name;
		this.accountLogin = account.login;
		this.accountId = account._id.toString();
		this.roleName = role.name;
		this.roleRights = role.rights;
	}
}