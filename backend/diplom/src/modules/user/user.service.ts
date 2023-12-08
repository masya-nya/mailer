import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UserRepository } from './user.repository';
import { UserDocument } from './user.model';
import { AddAccountDTO } from './DTO/add-account.dto';
import { AccountService } from './../account/account.service';
import { AccountRepository } from '../account/account.repository';
import { UserRDO } from './RDO/user.rdo';
import { ApiError } from 'src/core/exceptions/api-error.exception';

@Injectable()
export class UserService {
	constructor(
		@Inject(forwardRef(() => AccountService))
		private readonly accountService: AccountService,
		private readonly accountRepository: AccountRepository,
		private readonly userRepository: UserRepository
	) {}

	async createUser(createUserDTO: CreateUserDTO): Promise<UserDocument> {
		const userDB = await this.userRepository.findByEmail(createUserDTO.email);
		if (userDB) {
			throw ApiError.BadRequest('Такой пользователь уже существует');
		}
		const user = await this.userRepository.createUser(createUserDTO);
		
		return user;
	}

	
	async addAccount({ accountId, email }: AddAccountDTO): Promise<UserRDO> {
		const account = await this.accountService.getAccountById(
			accountId
		);
		if (!account) {
			throw ApiError.BadRequest('Ошибка добавления, такого аккаунта не существует');
		}
		const userDB = await this.userRepository.findByEmailAndAddAccount(
			email,
			account._id
		);
		await this.accountRepository.findByIdAndAddUser(account._id, userDB._id);
		const user = new UserRDO(userDB);
		return {...user};
	}

	async getUserByEmail(email: string): Promise<UserDocument> {
		return this.userRepository.findByEmail(email);
	}
	
	async getUserByEmailWithPopulate(email: string): Promise<UserRDO> {
		const userDocument = await this.userRepository.findByEmailWithPopulate(email);
		const user = new UserRDO(userDocument);
		return {...user};
	}

	async getAllUsers(): Promise<UserRDO[]> {
		const usersDB = await this.userRepository.findAllUsers();
		const users = usersDB.map(userDB => {
			const user = new UserRDO(userDB);
			return { ...user };
		});
		return users;
	}
}
