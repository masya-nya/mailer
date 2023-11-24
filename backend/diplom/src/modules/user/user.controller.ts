import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { PopulatedUser, UserDocument } from './user.model';
import { ENDPOINTS } from 'src/core/consts/endpoint';
import { AddAccountDTO } from './DTO/add-account.dto';
import { Types } from 'mongoose';

@Controller(ENDPOINTS.USER.BASE)
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	create(@Body() createUserDTO: CreateUserDTO): Promise<UserDocument> {
		return this.userService.createUser(createUserDTO);
	}

	@Patch(ENDPOINTS.USER.ADD_ACCOUNT)
	addUser(@Body() addAccountDTO: AddAccountDTO): Promise<UserDocument> {
		const userObjectId = new Types.ObjectId(addAccountDTO.accountId);
		return this.userService.addAccount({
			...addAccountDTO,
			accountId: userObjectId,
		});
	}

	@Get(`:${ENDPOINTS.USER.QUERIES.EMAIL}`)
	getUser(
		@Param(ENDPOINTS.USER.QUERIES.EMAIL) email: string
	): Promise<PopulatedUser> {
		return this.userService.getUserByEmailWidthPopulate(email);
	}

	@Get()
	getUsers(): Promise<UserDocument[]> {
		return this.userService.getAllUsers();
	}
}
