import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
	Account,
	AccountDocument,
	PopulatedAccount,
	PopulationUser,
} from './account.model';
import { Model, Types } from 'mongoose';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { UserRDOForPopulate } from '../user/RDO/user.rdo';

@Injectable()
export class AccountRepository {
	readonly className = 'AccountRepository';

	constructor(
		@InjectModel(Account.name)
		private accountModel: Model<AccountDocument>
	) {}

	async createAccount(
		createAccountDTO: CreateAccountDTO
	): Promise<AccountDocument> {
		try {
			const account =
				await this.accountModel.create(createAccountDTO);
			return account;
		} catch (error) {
			throw ApiError.InternalServerError(error.message, this.className);
		}
	}

	async findById(accountId: Types.ObjectId): Promise<AccountDocument> {
		try {
			const account = await this.accountModel.findById(accountId);
			return account;
		} catch (error) {
			throw ApiError.InternalServerError(error.message, this.className);
		}
	}

	async findAllByLogin(login: string): Promise<AccountDocument> {
		try {
			const account = await this.accountModel.findOne({ login });
			return account;
		} catch (error) {
			throw ApiError.InternalServerError(error.message, this.className);
		}
	}

	async findAllByOwnerEmail(owner: string): Promise<AccountDocument[]> {
		try {
			const account = await this.accountModel.find({ owner });
			return account;
		} catch (error) {
			throw ApiError.InternalServerError(error.message, this.className);
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
			throw ApiError.InternalServerError(error.message, this.className);
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
			throw ApiError.InternalServerError(error.message, this.className);
		}
	}
}
