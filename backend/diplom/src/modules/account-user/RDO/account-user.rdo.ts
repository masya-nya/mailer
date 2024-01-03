import { Account, AccountDocument } from 'src/modules/account/models/account.model';
import { EmailRDO } from 'src/modules/email/RDO/email.rdo';
import { RoleDocument } from 'src/modules/role/models/role.model';
import { PopulatedUser } from 'src/modules/user/models/user.model';

export class AccountUserRDO {
	readonly userId: string;

	readonly email: string;

	readonly accounts: Account[];

	readonly isActivate: boolean;

	readonly accountName: string;

	readonly accountLogin: string;

	readonly accountId: string;

	readonly roleName: string;

	readonly roleRights: string[];

	readonly emails: EmailRDO[];

	constructor(user: PopulatedUser, account: AccountDocument, role: RoleDocument, emails: EmailRDO[]) {
		this.userId = user._id.toString();
		this.email = user.email;
		this.accounts = user.accounts;
		this.isActivate = user.isActivate;
		this.accountName = account.name;
		this.accountLogin = account.login;
		this.accountId = account._id.toString();
		this.roleName = role.name;
		this.roleRights = role.rights;
		this.emails = emails;
	}
}