import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AccountUserService } from './account-user.service';
import { Logger } from 'src/core/logger/Logger';
import { GetAccountUserDTO } from './DTO/get-account-user.dto';
import { AccountUserRDO } from './RDO/account-user.rdo';
import ENDPOINTS from 'src/core/consts/endpoint';
const { ACCOUNT_USER: { BASE } } = ENDPOINTS;

@Controller(BASE)
export class AccountUserController {

	constructor(
		private readonly logger: Logger,
		private readonly accountUserService: AccountUserService,
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAccountUser(@Query() getAccountUserDTO: GetAccountUserDTO):Promise<AccountUserRDO> {
		this.logger.info(`Запрос получение информации пользователя аккаунта ${getAccountUserDTO.accountId} (${getAccountUserDTO.userId})`);
		const accountUser = await this.accountUserService.getAccountUser(getAccountUserDTO);
		this.logger.log(`Успешный сбор данных для пользователя ${accountUser.email} в аккаунт ${accountUser.accountLogin}`);
		return accountUser;
	}
}
