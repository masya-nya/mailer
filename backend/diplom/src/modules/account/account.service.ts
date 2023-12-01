import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	forwardRef,
} from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { AddUserDTO } from './DTO/add-user.dto';
import { UserService } from '../user/user.service';
import { AccountDocument, PopulatedAccount } from './account.model';
import { Types } from 'mongoose';
import { UserRepository } from '../user/user.repository';

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
		return this.accountRepository.createAccount(createAccountDTO);
	}

	async addUser(addUserDTO: AddUserDTO): Promise<AccountDocument> {
		const user = await this.userService.getUserByEmail(
			addUserDTO.userEmail
		);
		if (!user) {
			throw new HttpException(
				'Ошибка добавления, такого пользователя не существует',
				HttpStatus.BAD_REQUEST
			);
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
			throw new HttpException(
				'Такого пользователя не существует',
				HttpStatus.BAD_REQUEST
			);
		}
		return account;
	}

	async getAccountWithPopulate(accountId: string): Promise<PopulatedAccount> {
		const account =
			await this.accountRepository.findByIdWithPopulateUsers(accountId);
		if (!account) {
			throw new HttpException(
				'Такого пользователя не существует',
				HttpStatus.BAD_REQUEST
			);
		}
		return account;
	}
}
