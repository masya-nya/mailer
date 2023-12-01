import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Token, TokenDocument } from './token.model';
import { InjectModel } from '@nestjs/mongoose';
import { AddTokenDTO } from './DTO/add-token.dto';


@Injectable()
export class TokenRepository {
	constructor(
		@InjectModel(Token.name) private tokenRepository: Model<TokenDocument>
	) {}

	async saveToken(addTokenDTO: AddTokenDTO):Promise<TokenDocument> {
		try {
			return this.tokenRepository.create(addTokenDTO);;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async removeToken(refreshToken: string):Promise<boolean> {
		try {
			const { acknowledged: isDelete } = await this.tokenRepository.deleteOne({ refreshToken });
			return isDelete;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findByUserId(userId: Types.ObjectId):Promise<TokenDocument> {
		try {
			const token = await this.tokenRepository.findOne({ userId });
			return token;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	async findByToken(refreshToken: string):Promise<TokenDocument> {
		try {
			const token = await this.tokenRepository.findOne({ refreshToken });;
			return token;
		} catch (error) {
			throw new HttpException(
				`${error.message} in UserRepository`,
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}