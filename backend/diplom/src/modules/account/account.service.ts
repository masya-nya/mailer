import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { AddUserDTO } from './DTO/add-user.dto';
import { UserService } from '../user/user.service';
import { AccountDocument, PopulatedAccount } from './models/account.model';
import { Types } from 'mongoose';
import { UserRepository } from '../user/user.repository';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { MAX_ACCOUNTS_FOR_ONE_OWNER } from './config';
import { Logger } from 'src/core/logger/Logger';

@Injectable()
export class AccountService {
	constructor(
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		private readonly userRepository: UserRepository,
		private readonly accountRepository: AccountRepository,
		private readonly logger: Logger
	) {}

	async createAccount(
		createAccountDTO: CreateAccountDTO
	): Promise<AccountDocument> {
		const owner = await this.userService.findUserByEmail(createAccountDTO.owner);
		if (!owner) {
			this.logger.error(`Попытка создать аккаунт на несуществующего пользователя (${createAccountDTO.owner})`);
			throw ApiError.BadRequest('Такого пользователя не существует');
		}

		const sameLoginAccount = await this.accountRepository.findAllByLogin(createAccountDTO.login);
		if (sameLoginAccount) {
			this.logger.error(`Попытка создать аккаунт с уже существующим логином (${createAccountDTO.login})`);
			throw ApiError.BadRequest('Аккаунт с таким логином уже создан');
		}

		const ownerAccounts = await this.accountRepository.findAllByOwnerEmail(createAccountDTO.owner);
		if (ownerAccounts.length >= MAX_ACCOUNTS_FOR_ONE_OWNER) {
			this.logger.error(`Попытка создать больше ${MAX_ACCOUNTS_FOR_ONE_OWNER} аккаунтов (${createAccountDTO.owner})`);
			throw ApiError.BadRequest('Лимит аккаунтов превышен');
		}
		const newAccount = await this.accountRepository.createAccount(createAccountDTO);
		this.logger.log(`Аккаунт создан (${newAccount.name})`);
		return newAccount;
	}

	async addUser(addUserDTO: AddUserDTO): Promise<AccountDocument> {
		const user = await this.userService.findUserByEmail(
			addUserDTO.userEmail
		);
		if (!user) {
			this.logger.error(`Попытка добавление в аккаунт несуществующего пользователя (${addUserDTO.userEmail})`);
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
		this.logger.log(`Пользователь ${user.email} был добавлен в аккаунт ${account.login}`);
		return account;
	}

	async findAccountById(accountId: Types.ObjectId): Promise<AccountDocument> {
		const account = await this.accountRepository.findById(accountId);
		return account;
	}

	async findAccountWithPopulate(accountId: string): Promise<PopulatedAccount> {
		const account = await this.accountRepository.findByIdWithPopulateUsers(accountId);
		return account;
	}
}
