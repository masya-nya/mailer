import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UserRepository } from './user.repository';
import { PopulatedUser, User, UserDocument } from './models/user.model';
import { AddAccountDTO } from './DTO/add-account.dto';
import { AccountService } from './../account/account.service';
import { AccountRepository } from '../account/account.repository';
import { UserRDO } from './RDO/user.rdo';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { Logger } from 'src/core/logger/Logger';
import { ModelWithId } from 'src/core/types';

@Injectable()
export class UserService {
	constructor(
		@Inject(forwardRef(() => AccountService))
		private readonly accountService: AccountService,
		private readonly accountRepository: AccountRepository,
		private readonly userRepository: UserRepository,
		private readonly logger: Logger
	) {}

	async createUser(createUserDTO: CreateUserDTO): Promise<UserDocument> {
		const { email } = createUserDTO;
		const userDB = await this.userRepository.find({ email });
		if (userDB) {
			this.logger.error(`Попытка создания пользователя с уже существующим email (${email})`);
			throw ApiError.BadRequest('Такой пользователь уже существует');
		}
		const user = await this.userRepository.createUser(createUserDTO);
		this.logger.log(`Пользователь создан (${user.email})`);
		
		return user;
	}

	
	async addAccount(addAccountDTO: AddAccountDTO): Promise<UserRDO> {
		const { accountId, email } = addAccountDTO;
		const account = await this.accountService.findAccountById(
			accountId
		);
		if (!account) {
			this.logger.error(`Попытка добавления несуществующего аккаунта пользователю (${accountId})`);
			throw ApiError.BadRequest('Ошибка добавления, такого аккаунта не существует');
		}
		const userDB = await this.userRepository.findAndAddAccount(
			{ email },
			account._id
		);
		await this.accountRepository.findByIdAndAddUser(account._id, userDB._id);
		const user = new UserRDO(userDB);
		this.logger.log(`Аккаунт ${account.login} добавлен пользователю (${user.email})`);
		return {...user};
	}

	async find(findDTO:  Partial<ModelWithId<User>>): Promise<UserDocument> {
		const user = await this.userRepository.find({ ...findDTO });
		return user;
	}

	async findWithPopulate(findDTO:  Partial<ModelWithId<User>>): Promise<PopulatedUser> {
		const user = await this.userRepository.findWithPopulate({...findDTO});
		return user;
	}

	async getAllUsers(): Promise<UserRDO[]> {
		const usersDB = await this.userRepository.getAllUsers();
		const users = usersDB.map(userDB => {
			const user = new UserRDO(userDB);
			return { ...user };
		});
		return users;
	}
}
