import { Injectable } from '@nestjs/common';
import { Logger } from 'src/core/logger/Logger';
import { CreateRoleDTO } from './DTO/create-role.dto';
import {
	PopulatedRole,
	PopulationUser,
	Role,
	RoleDocument,
} from './models/role.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateWriteOpResult } from 'mongoose';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { ModelWithId } from 'src/core/types';
import { UserRDOForPopulate } from '../user/RDO/user.rdo';

@Injectable()
export class RoleRepository {
	serviceName: string = 'RoleRepository';

	constructor(
		@InjectModel(Role.name) private roleModel: Model<RoleDocument>,
		private readonly logger: Logger
	) {}

	async insertManyRoles(insertingRoles: Role[]): Promise<void> {
		try {
			await this.roleModel.insertMany(insertingRoles);
			return;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async createRole(createRoleDTO: CreateRoleDTO): Promise<RoleDocument> {
		try {
			const role = await this.roleModel.create(createRoleDTO);
			return role;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async deleteRole(deleteRoleDTO: Partial<ModelWithId<Role>>): Promise<void> {
		try {
			await this.roleModel.deleteOne({ ...deleteRoleDTO });
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async updateRole(
		searchDTO: Partial<ModelWithId<Role>>,
		updateDTO: Partial<ModelWithId<Role>>
	): Promise<UpdateWriteOpResult> {
		try {
			const role = await this.roleModel.updateOne(
				{ ...searchDTO },
				updateDTO
			);
			return role;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async find(findDTO: Partial<ModelWithId<Role>>): Promise<RoleDocument> {
		try {
			const role = await this.roleModel.findOne({ ...findDTO });
			return role;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findByUserIdAndAccountId(
		userId: Types.ObjectId,
		accountId: Types.ObjectId
	): Promise<RoleDocument> {
		try {
			const role = await this.roleModel.findOne({
				users: userId,
				accountId,
			});
			return role;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findAll(
		findDTO: Partial<ModelWithId<Role>>
	): Promise<PopulatedRole[]> {
		try {
			const roles = await this.roleModel
				.find({ ...findDTO })
				.populate<PopulationUser>('users', UserRDOForPopulate)
				.exec();
			return roles;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findAndAddUser(
		findDTO: Partial<ModelWithId<Role>>,
		userId: Types.ObjectId
	): Promise<RoleDocument> {
		try {
			const user = await this.roleModel.findOneAndUpdate(
				{ ...findDTO },
				{ $addToSet: { users: userId } },
				{ new: true }
			);
			return user;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	// async updateMany(): Promise<void> {
	// 	try {
	// 		const roles = await this.roleModel.updateMany();
	// 	} catch (error) {
	// 		this.logger.error(`Ошибка сервера в ${this.serviceName}`);
	// 		throw ApiError.InternalServerError(error.message);
	// 	}
	// }
}
