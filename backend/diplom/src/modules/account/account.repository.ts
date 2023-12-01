import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
	Account,
	AccountDocument,
	PopulatedAccount,
	PopulationUser,
} from './account.model';
import { Model, Types } from 'mongoose';
import { CreateAccountDTO } from './DTO/create-account.dto';

@Injectable()
export class AccountRepository {
	constructor(
		@InjectModel(Account.name)
		private accountRepository: Model<AccountDocument>
	) {}

	async createAccount(
		createAccountDTO: CreateAccountDTO
	): Promise<AccountDocument> {
		try {
			const account =
				await this.accountRepository.create(createAccountDTO);
			return account;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findById(accountId: Types.ObjectId): Promise<AccountDocument> {
		try {
			const account = this.accountRepository.findById(accountId);
			return account;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findByIdWithPopulateUsers(
		accountId: string
	): Promise<PopulatedAccount> {
		try {
			const account = this.accountRepository
				.findById(accountId)
				.populate<PopulationUser>('users', { email: 1 })
				.exec();
			return account;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findByIdAndAddUser(
		accountId: Types.ObjectId,
		userID: Types.ObjectId
	): Promise<AccountDocument> {
		try {
			const account = await this.accountRepository.findByIdAndUpdate(
				accountId,
				{ $addToSet: { users: userID } },
				{ new: true }
			);
			return account;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
