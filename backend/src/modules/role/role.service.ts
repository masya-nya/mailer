import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Logger } from 'src/core/logger/Logger';
import { RoleRepository } from './role.repository';
import { CreateRoleDTO } from './DTO/create-role.dto';
import { PopulatedRole, Role, RoleDocument } from './models/role.model';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { AccountService } from '../account/account.service';
import { Types } from 'mongoose';
import { getAdminRole, getRecruiteRole } from './patterns';
import { ModelWithId } from 'src/core/types';

@Injectable()
export class RoleService {

	constructor(
		@Inject(forwardRef(() => AccountService))
		private readonly accountService: AccountService,
		private readonly logger: Logger,
		private readonly roleRepository: RoleRepository,
	) {}

	async createRole(createRoleDTO: CreateRoleDTO): Promise<RoleDocument> {
		const { accountId, name } = createRoleDTO;
		const roleDB = await this.roleRepository.find({ name, accountId });
		if (roleDB) {
			this.logger.error(`Попытка создания уже существующей роли (${createRoleDTO.name})`);
			throw ApiError.BadRequest('Роль с таким названием уже существует');
		}
		const account = await this.accountService.find({ _id: accountId });
		if (!account) {
			this.logger.error(`Попытка создания роли для несуществующего аккаунта (${accountId})`);
			throw ApiError.BadRequest('Такого аккаунта не сущесвует');
		}
		const role = await this.roleRepository.createRole(createRoleDTO);
		this.logger.log(`Роль создана (${role.name}) для аккаунта(${role.accountId})`);
		
		return role;
	}

	async updateRole(updatingRole: ModelWithId<Role>):Promise<void> {
		const { _id, accountId, name, rights, users } = updatingRole;
		await this.roleRepository.updateRole({ _id, accountId }, { name, rights, users });
	}

	async deleteRole(deleteRoleDTO:  Partial<ModelWithId<Role>>):Promise<void> {
		await this.roleRepository.deleteRole(deleteRoleDTO);
	}

	async addPreventRoles(accountId: Types.ObjectId, owner: Types.ObjectId):Promise<void> {
		const preventRoles = [
			getRecruiteRole(accountId),
			getAdminRole(accountId, [owner])
		];
		this.roleRepository.insertManyRoles(preventRoles);
	}

	async findAndAddUser(
		findDTO:  Partial<ModelWithId<Role>>,
		userId: Types.ObjectId
	): Promise<RoleDocument> {
		const role = await this.roleRepository.findAndAddUser({ ...findDTO }, userId);
		return role;
	}

	async find(findDTO:  Partial<ModelWithId<Role>>): Promise<RoleDocument> {
		const role = await this.roleRepository.find({ ...findDTO });
		return role;
	}

	async findByUserIdAndAccountId(userId: Types.ObjectId, accountId: Types.ObjectId): Promise<RoleDocument> {
		const role = await this.roleRepository.findByUserIdAndAccountId(userId, accountId);
		return role;
	}

	async findAll(findDTO:  Partial<ModelWithId<Role>>): Promise<PopulatedRole[]> {
		const roles = await this.roleRepository.findAll({ ...findDTO });
		return roles;
	}

}
