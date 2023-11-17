import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository
	){}

	async createUser(createUserDTO: CreateUserDTO) {
		return this.userRepository.createUser(createUserDTO);
	}

	async getUserByEmail(email: string) {
		return this.userRepository.findUserByEmail(email);
	}

	async getAllUsers() {
		return this.userRepository.findAllUsers();
	}
}
