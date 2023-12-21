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
		const { userId, accountId } = getAccountUserDTO;
		const user = await this.userService.findWithPopulate({ _id: userId });
		const account = await this.accountService.findAccountById(accountId);
		const role = await this.roleService.findByEmailAndAccountId(userId, accountId);
		console.log(user);
		console.log(account);
		console.log(role);
		const accountUser = new AccountUserRDO(user, account, role);
		return {...accountUser};
	}
}
