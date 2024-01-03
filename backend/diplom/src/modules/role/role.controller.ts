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
import { Types, isValidObjectId } from 'mongoose';
import { UpdateRoleDTO, UpdateRolesDTO } from './DTO/update-roles.dto';
import { formatingRoleForCreate, formatingRoleForUpdate } from './utils/formatingRoleForUpdate';
const {
	ROLE: {
		BASE,
		ACCOUNT_ROLES: {
			PARAMS: { ACCOUNT_ID },
		},
		ADD_USER_TO_ROLE
	},
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
	async updateRoles(@Body() updateRolesDTO: UpdateRolesDTO): Promise<void> {
		this.logger.info(`Запрос на обновление ролей`);
		const { roles, accountId } = updateRolesDTO;
		const newRoles:UpdateRoleDTO[] = [];
		const updatedRoles:UpdateRoleDTO[] = [];
		const deletedRolesIds:Types.ObjectId[] = [];
		const updatedRolesIds:string[] = [];

		const accountRoles = await this.roleService.findAll({ accountId });

		roles.forEach(role => {
			if(isValidObjectId(role._id)) {
				updatedRolesIds.push(role._id);
				updatedRoles.push(role);
			} else {
				newRoles.push(role);
			}
		});

		accountRoles.forEach(role => {
			if(!updatedRolesIds.includes(role._id.toString())) {
				deletedRolesIds.push(role._id);
			}
		});

		console.log('deletedRolesIds', deletedRolesIds);
		deletedRolesIds.forEach(async (deleteRoleId) => {
			await this.roleService.deleteRole({ _id: deleteRoleId });
		});

		const formatedRolesForUpdate = formatingRoleForUpdate(updatedRoles);
		console.log('formatedRolesForUpdate', formatedRolesForUpdate);
		formatedRolesForUpdate.forEach(async (roleForUpdate) => {
			await this.roleService.updateRole(roleForUpdate);
		});

		const formatedRolesForCreate = formatingRoleForCreate(newRoles);
		console.log('formatedRolesForCreate', formatedRolesForCreate);
		formatedRolesForCreate.forEach(async (roleForCreate) => {
			const { accountId, name, rights, users } = roleForCreate;
			await this.roleService.createRole({ accountId, name, rights, users });
		});

		return;
	}

	@Patch(ADD_USER_TO_ROLE)
	@HttpCode(HttpStatus.CREATED)
	async addUserToRole(
		@Body() createRoleDTO: CreateRoleDTO
	): Promise<RoleRDO> {
		this.logger.info(`Запрос на добавление пользователя в роль`);
		const createdUser = await this.roleService.createRole(createRoleDTO);
		const user = new RoleRDO(createdUser);
		return { ...user };
	}

	// @Delete(DELETE_ROLE)
	// @HttpCode(HttpStatus.OK)
	// async deleteRole(
	// 	@Body() deleteRoleDTO: DeleteRoleDTO
	// ): Promise<StatusResponseType> {
	// 	const { accountId, name } = deleteRoleDTO;
	// 	this.logger.info(`Запрос на удаление роли(${name}) в аккаунте ${accountId}`);
	// 	await this.roleService.deleteRole(deleteRoleDTO);
	// 	this.logger.log(`Успешное удаление роли(${name}) в аккаунте ${accountId}`);
	// 	return { status: true };
	// }

	@Get(`:${ACCOUNT_ID}`)
	@HttpCode(HttpStatus.OK)
	async getAccountRoles(
		@Param(ACCOUNT_ID) accountId: string
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
