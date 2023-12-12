import { Controller, Post, Body, Patch, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { AccountService } from './account.service';
import { AddUserDTO } from './DTO/add-user.dto';
import { AccountDocument, PopulatedAccount } from './models/account.model';
import { ENDPOINTS } from 'src/core/consts/endpoint';
import { Types } from 'mongoose';
import { Logger } from 'src/core/logger/Logger';

@Controller(ENDPOINTS.ACCOUNT.BASE)
export class AccountController {

	constructor(
		private accountService: AccountService,
		private logger: Logger
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	create(
		@Body() createAccountDTO: CreateAccountDTO
	): Promise<AccountDocument> {
		this.logger.info('Запрос на создание аккаунта');
		return this.accountService.createAccount(createAccountDTO);
	}

	@Patch(ENDPOINTS.ACCOUNT.ADD_USER)
	@HttpCode(HttpStatus.CREATED)
	addUser(@Body() addUserDTO: AddUserDTO): Promise<AccountDocument> {
		this.logger.info('Запрос на добавление пользователя в аккаунт');
		const accountObjectId = new Types.ObjectId(addUserDTO.accountId);
		return this.accountService.addUser({
			...addUserDTO,
			accountId: accountObjectId,
		});
	}

	@Get(`:${ENDPOINTS.ACCOUNT.QUERIES.ACCOUNT_ID}`)
	@HttpCode(HttpStatus.OK)
	getAccount(
		@Param(ENDPOINTS.ACCOUNT.QUERIES.ACCOUNT_ID) accountId: string
	): Promise<PopulatedAccount> {
		this.logger.info('Запрос на получение данных аккаунта');
		return this.accountService.findAccountWithPopulate(accountId);
	}
}
