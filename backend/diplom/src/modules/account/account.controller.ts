import { Controller, Post, Body, Patch, Get, Param } from '@nestjs/common';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { AccountService } from './account.service';
import { AddUserDTORequest } from './DTO/add-user.dto';
import { AccountDocument, PopulatedAccount } from './account.model';
import { ENDPOINTS } from 'src/core/consts/endpoint';
import { Types } from 'mongoose';

@Controller(ENDPOINTS.ACCOUNT.BASE)
export class AccountController {
	constructor(private accountService: AccountService) {}

	@Post()
	create(
		@Body() createAccountDTO: CreateAccountDTO
	): Promise<AccountDocument> {
		return this.accountService.createAccount(createAccountDTO);
	}

	@Patch(ENDPOINTS.ACCOUNT.ADD_USER)
	addUser(@Body() addUserDTO: AddUserDTORequest): Promise<AccountDocument> {
		const accountObjectId = new Types.ObjectId(addUserDTO.accountId);
		return this.accountService.addUser({...addUserDTO, accountId: accountObjectId});
	}

	@Get(`:${ENDPOINTS.ACCOUNT.QUERIES.ACCOUNT_ID}`)
	getAccount(
		@Param(ENDPOINTS.ACCOUNT.QUERIES.ACCOUNT_ID) accountId: string
	): Promise<PopulatedAccount> {
		return this.accountService.getAccount(accountId);
	}
}
