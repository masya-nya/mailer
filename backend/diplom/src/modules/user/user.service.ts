import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UserRepository } from './user.repository';
import { PopulatedUser, UserDocument } from './user.model';
import { AddAccountDTO } from './DTO/add-account.dto';
import { AccountService } from './../account/account.service';
import { AccountRepository } from '../account/account.repository';

@Injectable()
export class UserService {
	constructor(
		@Inject(forwardRef(() => AccountService))
		private readonly accountService: AccountService,
		private readonly accountRepository: AccountRepository,
		private readonly userRepository: UserRepository
	) {}

	async createUser(createUserDTO: CreateUserDTO): Promise<UserDocument> {
		return this.userRepository.createUser(createUserDTO);
	}

	
	async addAccount({ accountId, email }: AddAccountDTO): Promise<UserDocument> {
		const account = await this.accountService.getAccountById(
			accountId
		);
		if (!account) {
			throw new HttpException(
				'Ошибка добавления, такого аккаунта не существует',
				HttpStatus.BAD_REQUEST
			);
		}
		const user = await this.userRepository.findByEmailAndAddAccount(
			email,
			account._id
		);
		await this.accountRepository.findByIdAndAddUser(account._id, user._id);
		return user;
	}

	async getUserByEmail(email: string): Promise<UserDocument> {
		return this.userRepository.findByEmail(email);
	}
	
	async getUserByEmailWidthPopulate(email: string): Promise<PopulatedUser> {
		try {
			return this.userRepository.findByEmailWithPopulate(email);
		} catch(e) {
			throw new HttpException(
				`${e.message}/UserService`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async getAllUsers(): Promise<UserDocument[]> {
		return this.userRepository.findAllUsers();
	}
}
