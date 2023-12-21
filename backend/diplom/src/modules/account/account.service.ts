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
import { RoleService } from '../role/role.service';

@Injectable()
export class AccountService {
	constructor(
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		@Inject(forwardRef(() => RoleService))
		private readonly roleService: RoleService,
		private readonly userRepository: UserRepository,
		private readonly accountRepository: AccountRepository,
		private readonly logger: Logger
	) {}

	async createAccount(
		createAccountDTO: CreateAccountDTO
	): Promise<AccountDocument> {
		const { owner, ownerId, login } = createAccountDTO;
		const user = await this.userService.find({ _id: ownerId });
		if (!user) {
			this.logger.error(`Попытка создать аккаунт на несуществующего пользователя (${owner})`);
			throw ApiError.BadRequest('Такого пользователя не существует');
		}

		const sameLoginAccount = await this.accountRepository.findByLogin(login);
		if (sameLoginAccount) {
			this.logger.error(`Попытка создать аккаунт с уже существующим логином (${login})`);
			throw ApiError.BadRequest('Аккаунт с таким логином уже создан');
		}

		const ownerAccounts = await this.accountRepository.findAllByOwnerEmail(owner);
		if (ownerAccounts.length >= MAX_ACCOUNTS_FOR_ONE_OWNER) {
			this.logger.error(`Попытка создать больше ${MAX_ACCOUNTS_FOR_ONE_OWNER} аккаунтов (${owner})`);
			throw ApiError.BadRequest('Лимит аккаунтов превышен');
		}
		const newAccount = await this.accountRepository.createAccount(createAccountDTO);
		this.userService.addAccount({ email: owner, accountId: newAccount._id });
		this.roleService.addPreventRoles(newAccount._id, ownerId);
		this.logger.log(`Аккаунт создан (${newAccount.name})`);
		return newAccount;
	}

	async addUser(addUserDTO: AddUserDTO): Promise<AccountDocument> {
		const { accountId, userEmail } = addUserDTO;
		const user = await this.userService.find({ email: userEmail });
		if (!user) {
			this.logger.error(`Попытка добавление в аккаунт несуществующего пользователя (${userEmail})`);
			throw ApiError.BadRequest('Такого пользователя не существует');
		}

		const account = await this.accountRepository.findByIdAndAddUser(
			accountId,
			user._id
		);

		await this.userRepository.findAndAddAccount(
			{ email: userEmail },
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
