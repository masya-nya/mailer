import { Injectable } from '@nestjs/common';
import { Logger } from 'src/core/logger/Logger';
import { UserService } from '../user/user.service';
import { GetAccountUserDTO } from './DTO/get-account-user.dto';
import { AccountService } from '../account/account.service';
import { RoleService } from '../role/role.service';
import { AccountUserRDO } from './RDO/account-user.rdo';

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
		const role = await this.roleService.findByEmailAndAccountId(email, accountId);
		const accountUser = new AccountUserRDO(user, account, role);
		return {...accountUser};
	}
}
