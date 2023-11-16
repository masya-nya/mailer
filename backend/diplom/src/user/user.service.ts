import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDTO } from './DTO/create-user.dto';

@Injectable()
export class UserService {

	constructor(
		@InjectModel(User.name) private UserRepository: Model<UserDocument>
	){}

	async createUser(createUserDTO: CreateUserDTO) {
		const createdUser = new this.UserRepository(createUserDTO);
		return createdUser.save();
	}

	async getUser(email: string) {
		const user = this.UserRepository.findOne({ email });
		return user;
	}
}
