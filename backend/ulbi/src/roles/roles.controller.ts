import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDTO } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Role } from './roles.model';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

	constructor(private rolesService: RolesService) {}

	//* /roles
	@ApiOperation({ summary: 'Создание роли' })
	@ApiResponse({ status: HttpStatus.OK, type: Role })
	@Post()
	create(@Body() roleDTO: CreateRoleDTO):Promise<Role> {
		return this.rolesService.createRole(roleDTO);
	}

	//* /roles/{value}
	@ApiOperation({ summary: 'Получение роли' })
	@ApiResponse({ status: HttpStatus.OK, type: Role })
	@Get(':value')
	getRole(@Param('value') value: string) {
		return this.rolesService.getRoleByName(value);
	}
}
