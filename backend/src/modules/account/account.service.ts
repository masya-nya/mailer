import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { AddUserDTO } from './DTO/add-user.dto';
import { UserService } from '../user/user.service';
import { Account, AccountDocument, PopulatedAccount } from './models/account.model';
import { UserRepository } from '../user/user.repository';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { MAX_ACCOUNTS_FOR_ONE_OWNER } from './config';
import { Logger } from 'src/core/logger/Logger';
import { RoleService } from '../role/role.service';
import { ModelWithId } from 'src/core/types';
import { RolesSystemNames } from '../role/patterns';

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

		const sameLoginAccount = await this.accountRepository.find({ login });
		if (sameLoginAccount) {
			this.logger.error(`Попытка создать аккаунт с уже существующим логином (${login})`);
			throw ApiError.BadRequest('Аккаунт с таким логином уже создан');
		}

		const ownerAccounts = await this.accountRepository.findAll({ owner });
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

		const account = await this.accountRepository.findAndAddUser(
			{ _id: accountId },
			user._id
		);

		await this.userRepository.findAndAddAccount(
			{ email: userEmail },
			account._id
		);

		await this.roleService.findAndAddUser(
			{
				accountId: account._id,
				systemName: RolesSystemNames.RECRUITE
			},
			user._id
		);

		this.logger.log(`Пользователь ${user.email} был добавлен в аккаунт ${account.login}`);
		return account;
	}

	async find(findDTO:  Partial<ModelWithId<Account>>): Promise<AccountDocument> {
		const account = await this.accountRepository.find({ ...findDTO });
		return account;
	}

	async findWithPopulate(findDTO:  Partial<ModelWithId<Account>>): Promise<PopulatedAccount> {
		const account = await this.accountRepository.findWithPopulate({ ...findDTO });
		return account;
	}
}
