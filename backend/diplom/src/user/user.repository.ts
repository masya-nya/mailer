import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDTO } from './DTO/create-user.dto';

@Injectable()
export class UserRepository {

	constructor(
		@InjectModel(User.name) private UserRepository: Model<UserDocument>
	){}

	async createUser(createUserDTO: CreateUserDTO) {
		try {
			const createdUser = new this.UserRepository(createUserDTO);
			return createdUser.save();
		} catch(error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getUser(email: string) {
		const user = this.UserRepository.findOne({ email });
		return user;
	}
}
