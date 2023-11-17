import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDTO } from './DTO/create-user.dto';

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name) private userRepository: Model<UserDocument>
	){}

	async createUser(createUserDTO: CreateUserDTO):Promise<UserDocument> {
		try {
			const createdUser = await this.userRepository.create(createUserDTO);
			return createdUser;
		} catch(error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findUserByEmail(email: string):Promise<UserDocument> {
		try {
			const user = await this.userRepository.findOne({ email });
			return user;
		} catch(error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findAllUsers():Promise<UserDocument[]> {
		try {
			const users = await this.userRepository.find().lean();
			return users;
		} catch(error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
