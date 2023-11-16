import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDTO } from './dto/add-role.dto';
import { BanUserDTO } from './dto/ban-user.dto';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	
	constructor(private usersService: UsersService) {}

	//* /user
	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiResponse({ status: HttpStatus.OK, type: User })
	@Post()
	create(@Body() userDTO: CreateUserDTO) {
		return this.usersService.createUser(userDTO);
	}

	//* /user
	@ApiOperation({ summary: 'Получение всех пользователей' })
	@ApiResponse({ status: HttpStatus.OK, type: [User] })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	// @UseGuards(JwtAuthGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUser();
	}

	//* /user/role
	@ApiOperation({ summary: 'Выдать роль' })
	@ApiResponse({ status: HttpStatus.OK })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Post('/role')
	addRole(@Body() addRoleDTO: AddRoleDTO) {
		return this.usersService.addRole(addRoleDTO);
	}

	//* /user/ban
	@ApiOperation({ summary: 'Забанить пользователя' })
	@ApiResponse({ status: HttpStatus.OK })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Post('/ban')
	banUser(@Body() banUserDTO: BanUserDTO) {
		return this.usersService.banUser(banUserDTO);
	}
}
