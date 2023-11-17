import { Controller, Post, Body, Patch, Get, Param } from '@nestjs/common';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { AccountService } from './account.service';
import { AddUserDTO } from './DTO/add-user.dto';

@Controller('account')
export class AccountController {
	
	constructor(
		private accountService: AccountService
	){}

	@Post()
	create(@Body() createAccountDTO: CreateAccountDTO) {
		return this.accountService.createAccount(createAccountDTO);
	}

	@Patch('/add-user')
	addUser(@Body() addUserDTO: AddUserDTO ) {
		return this.accountService.addUser(addUserDTO);
	}

	@Get(':accountId')
	getAccount(@Param('accountId') accountId: string) {
		return this.accountService.getAccount(accountId);
	}
}
