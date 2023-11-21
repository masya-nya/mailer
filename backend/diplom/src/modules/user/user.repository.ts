import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
	PopulatedUser,
	PopulationAccount,
	User,
	UserDocument,
} from './user.model';
import { Model, Types } from 'mongoose';
import { CreateUserDTO } from './DTO/create-user.dto';

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name) private userRepository: Model<UserDocument>
	) {}

	async createUser(createUserDTO: CreateUserDTO): Promise<UserDocument> {
		try {
			const createdUser = await this.userRepository.create(createUserDTO);
			return createdUser;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findByEmail(email: string): Promise<UserDocument> {
		try {
			const user = await this.userRepository.findOne({ email });
			return user;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findByEmailWithPopulate(email: string): Promise<PopulatedUser> {
		try {
			const user = await this.userRepository
				.findOne({ email })
				.populate<PopulationAccount>('accounts')
				.exec();
			return user;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findByEmailAndUpdate(
		email: string,
		accountId: Types.ObjectId
	): Promise<UserDocument> {
		try {
			const user = await this.userRepository.findOneAndUpdate(
				{ email },
				{ $addToSet: { accounts: accountId } },
				{ new: true }
			);
			return user;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findAllUsers(): Promise<UserDocument[]> {
		try {
			const users = await this.userRepository.find().lean();
			return users;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
