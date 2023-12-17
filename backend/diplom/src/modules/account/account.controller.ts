import { Controller, Post, Body, Patch, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { AccountService } from './account.service';
import { AddUserDTO } from './DTO/add-user.dto';
import { AccountDocument, PopulatedAccount } from './models/account.model';
import { Types } from 'mongoose';
import { Logger } from 'src/core/logger/Logger';
import ENDPOINTS from 'src/core/consts/endpoint';
import { AccountRDO } from './RDO/account.rdo';
const { ACCOUNT: { ADD_USER, BASE, QUERIES: { ACCOUNT_ID } } } = ENDPOINTS;

@Controller(BASE)
export class AccountController {

	constructor(
		private accountService: AccountService,
		private logger: Logger
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body() createAccountDTO: CreateAccountDTO
	): Promise<AccountRDO> {
		this.logger.info('Запрос на создание аккаунта');
		const newAccount = await this.accountService.createAccount(createAccountDTO);
		const account = new AccountRDO(newAccount);
		return {...account};
	}

	@Patch(ADD_USER)
	@HttpCode(HttpStatus.CREATED)
	addUser(@Body() addUserDTO: AddUserDTO): Promise<AccountDocument> {
		this.logger.info('Запрос на добавление пользователя в аккаунт');
		const accountObjectId = new Types.ObjectId(addUserDTO.accountId);
		return this.accountService.addUser({
			...addUserDTO,
			accountId: accountObjectId,
		});
	}

	@Get(`:${ACCOUNT_ID}`)
	@HttpCode(HttpStatus.OK)
	getAccount(
		@Param(ACCOUNT_ID) accountId: string
	): Promise<PopulatedAccount> {
		this.logger.info('Запрос на получение данных аккаунта');
		return this.accountService.findAccountWithPopulate(accountId);
	}
}
