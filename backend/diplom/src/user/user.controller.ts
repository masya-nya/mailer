import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/create-user.dto';

@Controller('user')
export class UserController {

	constructor(private userService: UserService){}

	@Post()
	create(@Body() createUserDto: CreateUserDTO ) {
		return this.userService.createUser(createUserDto);
	}

	@Get(':email')
	getUser(@Param('email') email: string) {
		return this.userService.getUser(email);
	}
}
