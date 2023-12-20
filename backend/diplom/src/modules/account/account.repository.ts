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

	async findById(accountId: Types.ObjectId): Promise<AccountDocument> {
		try {
			const account = await this.accountModel.findById(accountId);
			return account;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findByLogin(login: string): Promise<AccountDocument> {
		try {
			const account = await this.accountModel.findOne({ login });
			return account;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findAllByOwnerEmail(ownerEmail: string): Promise<AccountDocument[]> {
		try {
			const account = await this.accountModel.find({ owner: ownerEmail });
			return account;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findByIdWithPopulateUsers(
		accountId: string
	): Promise<PopulatedAccount> {
		try {
			const account = await this.accountModel
				.findById(accountId)
				.populate<PopulationUser>('users', UserRDOForPopulate)
				.exec();
			return account;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findByIdAndAddUser(
		accountId: Types.ObjectId,
		userID: Types.ObjectId
	): Promise<AccountDocument> {
		try {
			const account = await this.accountModel.findByIdAndUpdate(
				accountId,
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
