import { Injectable } from '@nestjs/common';
import { Logger } from 'src/core/logger/Logger';
import { CreateRoleDTO } from './DTO/create-role.dto';
import { Role, RoleDocument } from './models/role.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ApiError } from 'src/core/exceptions/api-error.exception';


@Injectable()
export class RoleRepository {
	serviceName: string = 'RoleRepository';

	constructor(
		@InjectModel(Role.name) private roleModel: Model<RoleDocument>,
		private readonly logger: Logger
	) {}
	
	async findByNameAndAccountId(name: string, accountId: Types.ObjectId): Promise<RoleDocument> {
		try {
			const role = await this.roleModel.findOne({ name, accountId });
			return role;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findByEmailAndAccountId(email: string, accountId: Types.ObjectId): Promise<RoleDocument> {
		try {
			const role = await this.roleModel.findOne({ users: email, accountId });
			return role;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async createRole(createRoleDTO: CreateRoleDTO): Promise<RoleDocument> {
		try {
			const createdUser = await this.roleModel.create(createRoleDTO);
			return createdUser;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

}