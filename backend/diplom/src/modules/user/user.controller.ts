import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { PopulatedUser, UserDocument } from './user.model';
import { ENDPOINTS } from 'src/core/consts/endpoint';

@Controller(ENDPOINTS.USER.BASE)
export class UserController {

	constructor(private userService: UserService){}

	@Post()
	create(@Body() createUserDTO: CreateUserDTO ):Promise<UserDocument> {
		return this.userService.createUser(createUserDTO);
	}

	@Get(`:${ENDPOINTS.USER.QUERIES.EMAIL}`)
	getUser(@Param(ENDPOINTS.USER.QUERIES.EMAIL) email: string):Promise<PopulatedUser> {
		return this.userService.getUserByEmailWidthPopulate(email);
	}

	@Get()
	getUsers():Promise<UserDocument[]> {
		return this.userService.getAllUsers();
	}
}
