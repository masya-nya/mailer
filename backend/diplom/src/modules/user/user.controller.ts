import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { ENDPOINTS } from 'src/core/consts/endpoint';
import { AddAccountDTO } from './DTO/add-account.dto';
import { Types } from 'mongoose';
import { UserRDO } from './RDO/user.rdo';

@Controller(ENDPOINTS.USER.BASE)
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	async create(@Body() createUserDTO: CreateUserDTO): Promise<UserRDO> {
		const createdUser = await this.userService.createUser(createUserDTO);
		const user = new UserRDO(createdUser);
		return {...user};
	}

	@Patch(ENDPOINTS.USER.ADD_ACCOUNT)
	addAccount(@Body() addAccountDTO: AddAccountDTO): Promise<UserRDO> {
		const userObjectId = new Types.ObjectId(addAccountDTO.accountId);
		return this.userService.addAccount({
			...addAccountDTO,
			accountId: userObjectId,
		});
	}

	@Get(`:${ENDPOINTS.USER.QUERIES.EMAIL}`)
	async getUser(
		@Param(ENDPOINTS.USER.QUERIES.EMAIL) email: string
	): Promise<UserRDO> {
		const user = await this.userService.getUserByEmailWithPopulate(email);
		return user;
	}

	@Get()
	getUsers(): Promise<UserRDO[]> {
		return this.userService.getAllUsers();
	}
}
