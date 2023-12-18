import { Injectable } from '@nestjs/common';
import { Logger } from 'src/core/logger/Logger';
import { UserService } from '../user/user.service';
import { GetAccountUserDTO } from './DTO/get-account-user.dto';
import { AccountService } from '../account/account.service';
import { RoleService } from '../role/role.service';
import { AccountUserRDO } from './RDO/account-user.rdo';
import { RECRUITE_ROLE_ACCOUNT_ID } from '../role/config';

@Injectable()
export class AccountUserService {

	constructor(
		private readonly logger: Logger,
		private readonly userService: UserService,
		private readonly accountService: AccountService,
		private readonly roleService: RoleService
	) {}

	async getAccountUser(getAccountUserDTO: GetAccountUserDTO):Promise<AccountUserRDO> {
		const { email, accountId } = getAccountUserDTO;
		const user = await this.userService.findUserByEmailWithPopulate(email);
		const account = await this.accountService.findAccountById(accountId);
		let role = await this.roleService.findByEmailAndAccountId(email, accountId);
		if (!role) {
			role = await this.roleService.findByAccountId(RECRUITE_ROLE_ACCOUNT_ID);
		}
		const accountUser = new AccountUserRDO(user, account, role);
		return {...accountUser};
	}
}
