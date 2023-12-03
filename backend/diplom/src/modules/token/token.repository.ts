import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Token, TokenDocument } from './token.model';
import { InjectModel } from '@nestjs/mongoose';
import { AddTokenDTO } from './DTO/add-token.dto';
import { ApiError } from 'src/core/exceptions/api-error.exception';

@Injectable()
export class TokenRepository {
	readonly className = 'TokenRepository';

	constructor(
		@InjectModel(Token.name) private tokenRepository: Model<TokenDocument>
	) {}

	async saveToken(addTokenDTO: AddTokenDTO): Promise<TokenDocument> {
		try {
			return this.tokenRepository.create(addTokenDTO);
		} catch (error) {
			throw ApiError.InternalServerError(error.message, this.className);
		}
	}

	async removeToken(refreshToken: string): Promise<boolean> {
		try {
			const { acknowledged: isDelete } =
				await this.tokenRepository.deleteOne({ refreshToken });
			return isDelete;
		} catch (error) {
			throw ApiError.InternalServerError(error.message, this.className);
		}
	}

	async findByUserId(userId: Types.ObjectId): Promise<TokenDocument> {
		try {
			const token = await this.tokenRepository.findOne({ userId });
			return token;
		} catch (error) {
			throw ApiError.InternalServerError(error.message, this.className);
		}
	}

	async findByToken(refreshToken: string): Promise<TokenDocument> {
		try {
			const token = await this.tokenRepository.findOne({ refreshToken });
			return token;
		} catch (error) {
			throw ApiError.InternalServerError(error.message, this.className);
		}
	}
}
