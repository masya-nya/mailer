import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
	PopulatedUser,
	PopulationAccount,
	User,
	UserDocument,
} from './models/user.model';
import { Model, Types } from 'mongoose';
import { CreateUserDTO } from './DTO/create-user.dto';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { AccountRDOForPopulate } from '../account/RDO/account.rdo';
import { Logger } from 'src/core/logger/Logger';
import { ModelWithId } from 'src/core/types';

@Injectable()
export class UserRepository {
	readonly serviceName = 'UserRepository';

	constructor(
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private readonly logger: Logger
	) {}

	async createUser(createUserDTO: CreateUserDTO): Promise<UserDocument> {
		try {
			const createdUser = await this.userModel.create(createUserDTO);
			return createdUser;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async find(findDTO:  Partial<ModelWithId<User>>): Promise<UserDocument> {
		try {
			const user = await this.userModel.findOne({ ...findDTO });
			return user;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findWithPopulate(findDTO:  Partial<ModelWithId<User>>): Promise<PopulatedUser> {
		try {
			const user = await this.userModel
				.findOne({ ...findDTO })
				.populate<PopulationAccount>('accounts', AccountRDOForPopulate)
				.exec();
			return user;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findAndAddAccount(
		findDTO:  Partial<ModelWithId<User>>,
		accountId: Types.ObjectId
	): Promise<UserDocument> {
		try {
			const user = await this.userModel.findOneAndUpdate(
				{ ...findDTO },
				{ $addToSet: { accounts: accountId } },
				{ new: true }
			);
			return user;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async getAllUsers(): Promise<UserDocument[]> {
		try {
			const users = await this.userModel.find().lean();
			return users;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}
}
