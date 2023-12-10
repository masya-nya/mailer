import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AccountUserService } from './account-user.service';
import { Logger } from 'src/core/logger/Logger';
import { GetAccountUserDTO } from './DTO/get-account-user.dto';
import { AccountUserRDO } from './RDO/account-user.rdo';

@Controller('account-user')
export class AccountUserController {

	constructor(
		private readonly logger: Logger,
		private readonly accountUserService: AccountUserService,
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAccountUser(@Query() getAccountUserDTO: GetAccountUserDTO):Promise<AccountUserRDO> {
		const accountUser = await this.accountUserService.getAccountUser(getAccountUserDTO);
		return accountUser;
	}
}
