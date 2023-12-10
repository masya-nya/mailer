import { Body, Controller, Get, Param, Post, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { ENDPOINTS } from 'src/core/consts/endpoint';
import { AddAccountDTO } from './DTO/add-account.dto';
import { Types } from 'mongoose';
import { UserRDO } from './RDO/user.rdo';
import { Logger } from 'src/core/logger/Logger';

@Controller(ENDPOINTS.USER.BASE)
export class UserController {

	constructor(
		private readonly userService: UserService,
		private readonly logger: Logger
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createUserDTO: CreateUserDTO): Promise<UserRDO> {
		this.logger.info('Запрос на создания пользователя');
		const createdUser = await this.userService.createUser(createUserDTO);
		const user = new UserRDO(createdUser);
		return {...user};
	}

	@Patch(ENDPOINTS.USER.ADD_ACCOUNT)
	@HttpCode(HttpStatus.CREATED)
	addAccount(@Body() addAccountDTO: AddAccountDTO): Promise<UserRDO> {
		this.logger.info('Запрос на добавление пользователю аккаунта');
		const userObjectId = new Types.ObjectId(addAccountDTO.accountId);
		return this.userService.addAccount({
			...addAccountDTO,
			accountId: userObjectId,
		});
	}

	@Get(`:${ENDPOINTS.USER.QUERIES.EMAIL}`)
	@HttpCode(HttpStatus.OK)
	async getUser(
		@Param(ENDPOINTS.USER.QUERIES.EMAIL) email: string
	): Promise<UserRDO> {
		this.logger.info('Запрос на получение пользователя');
		const userDocument = await this.userService.findUserByEmailWithPopulate(email);
		const user = new UserRDO(userDocument);
		return user;
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	getUsers(): Promise<UserRDO[]> {
		this.logger.info('Запрос на получение пользователей');
		return this.userService.getAllUsers();
	}
}
