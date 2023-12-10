import { Injectable } from '@nestjs/common';
import { Logger } from 'src/core/logger/Logger';
import { RoleRepository } from './role.repository';
import { CreateRoleDTO } from './DTO/create-role.dto';
import { RoleDocument } from './models/role.model';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { AccountService } from '../account/account.service';
import { Types } from 'mongoose';

@Injectable()
export class RoleService {

	constructor(
		private readonly logger: Logger,
		private readonly roleRepository: RoleRepository,
		private readonly accountService: AccountService
	) {}

	async createRole(createRoleDTO: CreateRoleDTO): Promise<RoleDocument> {
		const { accountId, name } = createRoleDTO;
		const roleDB = await this.roleRepository.findByNameAndAccountId(name, accountId);
		if (roleDB) {
			this.logger.error(`Попытка создания уже существующей роли (${createRoleDTO.name})`);
			throw ApiError.BadRequest('Роль с таким названием уже существует');
		}
		const account = await this.accountService.findAccountById(accountId);
		if (!account) {
			this.logger.error(`Попытка создания роли для несуществующего аккаунта (${accountId})`);
			throw ApiError.BadRequest('Такого аккаунта не сущесвует');
		}
		const role = await this.roleRepository.createRole(createRoleDTO);
		this.logger.log(`Роль создана (${role.name}) для аккаунта(${role.accountId})`);
		
		return role;
	}

	async findByNameAndAccountId(name: string, accountId: Types.ObjectId): Promise<RoleDocument> {
		const role = await this.roleRepository.findByNameAndAccountId(name, accountId);
		return role;
	}

	async findByEmailAndAccountId(email: string, accountId: Types.ObjectId): Promise<RoleDocument> {
		const role = await this.roleRepository.findByEmailAndAccountId(email, accountId);
		return role;
	}

}
