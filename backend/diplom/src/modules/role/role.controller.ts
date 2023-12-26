import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { Logger } from 'src/core/logger/Logger';
import { RoleService } from './role.service';
import { CreateRoleDTO } from './DTO/create-role.dto';
import { RoleRDO } from './RDO/role.rdo';
import ENDPOINTS from 'src/core/consts/endpoint';
import { Types } from 'mongoose';
const {
	ROLE: { BASE, ACCOUNT_ROLES },
} = ENDPOINTS;

@Controller(BASE)
export class RoleController {
	constructor(
		private readonly logger: Logger,
		private readonly roleService: RoleService
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createRoleDTO: CreateRoleDTO): Promise<RoleRDO> {
		this.logger.info(
			`Запрос на создания роли в аккаунт(${createRoleDTO.accountId})`
		);
		console.log(createRoleDTO);
		const createdUser = await this.roleService.createRole(createRoleDTO);
		const user = new RoleRDO(createdUser);
		return { ...user };
	}

	@Patch()
	@HttpCode(HttpStatus.CREATED)
	async addUserToRole(
		@Body() createRoleDTO: CreateRoleDTO
	): Promise<RoleRDO> {
		this.logger.info(`Запрос на добавление пользователя в роль`);
		console.log(createRoleDTO);
		const createdUser = await this.roleService.createRole(createRoleDTO);
		const user = new RoleRDO(createdUser);
		return { ...user };
	}

	@Get(`:${ACCOUNT_ROLES.PARAMS.ACCOUNT_ID}`)
	@HttpCode(HttpStatus.OK)
	async getAccountRoles(
		@Param(ACCOUNT_ROLES.PARAMS.ACCOUNT_ID) accountId: string
	): Promise<RoleRDO[]> {
		this.logger.info(`Запрос на получение ролей для аккаунта ${accountId}`);
		const accountObjectId = new Types.ObjectId(accountId);
		const rolesDB = await this.roleService.findAll({
			accountId: accountObjectId,
		});
		const roles = rolesDB.map(roleDB => {
			const user = new RoleRDO(roleDB);
			return { ...user };
		});
		this.logger.log(`Удачный сбор ролей для аккаунта ${accountId}`);
		return roles;
	}
}
