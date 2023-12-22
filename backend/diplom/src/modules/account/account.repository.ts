import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
	Account,
	AccountDocument,
	PopulatedAccount,
	PopulationUser,
} from './models/account.model';
import { Model, Types } from 'mongoose';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { UserRDOForPopulate } from '../user/RDO/user.rdo';
import { Logger } from 'src/core/logger/Logger';
import { ModelWithId } from 'src/core/types';

@Injectable()
export class AccountRepository {
	readonly serviceName = 'AccountRepository';

	constructor(
		@InjectModel(Account.name) private accountModel: Model<AccountDocument>,
		private readonly logger: Logger
	) {}

	async createAccount(
		createAccountDTO: CreateAccountDTO
	): Promise<AccountDocument> {
		try {
			const account =
				await this.accountModel.create(createAccountDTO);
			return account;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async find(findDTO:  Partial<ModelWithId<Account>>): Promise<AccountDocument> {
		try {
			const account = await this.accountModel.findOne({ ...findDTO });
			return account;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findAll(findDTO:  Partial<ModelWithId<Account>>): Promise<AccountDocument[]> {
		try {
			const account = await this.accountModel.find({ ...findDTO });
			return account;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findWithPopulate(
		findDTO:  Partial<ModelWithId<Account>>
	): Promise<PopulatedAccount> {
		try {
			const account = await this.accountModel
				.findOne({ ...findDTO })
				.populate<PopulationUser>('users', UserRDOForPopulate)
				.exec();
			return account;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findAndAddUser(
		findDTO: Partial<ModelWithId<Account>>,
		userID: Types.ObjectId
	): Promise<AccountDocument> {
		try {
			const account = await this.accountModel.findByIdAndUpdate(
				{ ...findDTO },
				{ $addToSet: { users: userID } },
				{ new: true }
			);
			return account;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}
}
