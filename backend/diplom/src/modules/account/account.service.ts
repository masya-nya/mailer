import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { AddUserDTO } from './DTO/add-user.dto';
import { UserService } from '../user/user.service';
import { AccountDocument, PopulatedAccount } from './account.model';
import { Types } from 'mongoose';
import { UserRepository } from '../user/user.repository';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { MAX_ACCOUNTS_FOR_ONE_OWNER } from './config';

@Injectable()
export class AccountService {
	constructor(
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		private readonly userRepository: UserRepository,
		private readonly accountRepository: AccountRepository
	) {}

	async createAccount(
		createAccountDTO: CreateAccountDTO
	): Promise<AccountDocument> {
		const owner = await this.userService.getUserByEmail(createAccountDTO.owner);
		if (!owner) {
			throw ApiError.BadRequest('Такого пользователя не существует');
		}

		const sameLoginAccount = await this.accountRepository.findAllByLogin(createAccountDTO.login);
		if (sameLoginAccount) {
			throw ApiError.BadRequest('Аккаунт с таким логином уже создан');
		}

		const ownerAccounts = await this.accountRepository.findAllByOwnerEmail(createAccountDTO.owner);
		if (ownerAccounts.length >= MAX_ACCOUNTS_FOR_ONE_OWNER) {
			throw ApiError.BadRequest('Лимит аккаунтов превышен');
		}
		const newAccount = await this.accountRepository.createAccount(createAccountDTO);
		return newAccount;
	}

	async addUser(addUserDTO: AddUserDTO): Promise<AccountDocument> {
		const user = await this.userService.getUserByEmail(
			addUserDTO.userEmail
		);
		if (!user) {
			throw ApiError.BadRequest('Такого пользователя не существует');
		}
		const account = await this.accountRepository.findByIdAndAddUser(
			addUserDTO.accountId,
			user._id
		);
		await this.userRepository.findByEmailAndAddAccount(
			user.email,
			account._id
		);
		return account;
	}

	async getAccountById(accountId: Types.ObjectId): Promise<AccountDocument> {
		const account = await this.accountRepository.findById(accountId);
		if (!account) {
			throw ApiError.BadRequest('Такого аккаунта не существует');
		}
		return account;
	}

	async getAccountWithPopulate(accountId: string): Promise<PopulatedAccount> {
		const account =
			await this.accountRepository.findByIdWithPopulateUsers(accountId);
		if (!account) {
			throw ApiError.BadRequest('Такого аккаунта не существует');
		}
		return account;
	}
}
