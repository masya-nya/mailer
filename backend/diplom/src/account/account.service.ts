import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDTO } from './DTO/create-account.dto';
import { AddUserDTO } from './DTO/add-user.dto';
import { UserRepository } from './../user/user.repository';

@Injectable()
export class AccountService {

	constructor(
		private readonly accountRepository: AccountRepository,
		private userRepository: UserRepository
	) {}


	async createAccount(createAccountDTO: CreateAccountDTO) {
		return this.accountRepository.createAccount(createAccountDTO);
	}

	async addUser(addUserDTO: AddUserDTO){
		const user = await this.userRepository.findUserByEmail(addUserDTO.userEmail);
		if (!user) {
			throw new HttpException(
				'Ошибка добавления, такого пользователя не существует',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
		const account = await this.accountRepository.findByIdAndAddUser(addUserDTO.accountId, user._id);
		return account;
	}

	async getAccount(accountId: string) {
		const account = await this.accountRepository.findByIdWithPopulateUsers(accountId);
		if (!account) {
			throw new HttpException(
				'Такого пользователя не существует',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
		return account;
	}
}
