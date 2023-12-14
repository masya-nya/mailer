import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Logger } from 'src/core/logger/Logger';
import { RoleService } from './role.service';
import { CreateRoleDTO } from './DTO/create-role.dto';
import { RoleRDO } from './RDO/role.rdo';
import ENDPOINTS from 'src/core/consts/endpoint';
const { ROLE: { BASE } } = ENDPOINTS;

@Controller(BASE)
export class RoleController {

	constructor(
		private readonly logger: Logger,
		private readonly roleService: RoleService
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createRoleDTO: CreateRoleDTO ):Promise<RoleRDO> {
		this.logger.info(`Запрос на создания роли в аккаунт(${createRoleDTO.accountId})`);
		console.log(createRoleDTO);
		const createdUser = await this.roleService.createRole(createRoleDTO);
		const user = new RoleRDO(createdUser);
		return {...user};
	}
}
