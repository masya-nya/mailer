import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Token, TokenDocument } from './token.model';
import { InjectModel } from '@nestjs/mongoose';
import { AddTokenDTO } from './DTO/add-token.dto';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { Logger } from 'src/core/logger/Logger';

@Injectable()
export class TokenRepository {
	readonly serviceName = 'TokenRepository';

	constructor(
		@InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
		private readonly logger: Logger
	) {}

	async saveToken(addTokenDTO: AddTokenDTO): Promise<TokenDocument> {
		try {
			return await this.tokenModel.create(addTokenDTO);
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async removeToken(refreshToken: string): Promise<boolean> {
		try {
			const { acknowledged: isDelete } =
				await this.tokenModel.deleteOne({ refreshToken });
			return isDelete;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findByUserId(userId: Types.ObjectId): Promise<TokenDocument> {
		try {
			const token = await this.tokenModel.findOne({ userId });
			return token;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}

	async findByToken(refreshToken: string): Promise<TokenDocument> {
		try {
			const token = await this.tokenModel.findOne({ refreshToken });
			return token;
		} catch (error) {
			this.logger.error(`Ошибка сервера в ${this.serviceName}`);
			throw ApiError.InternalServerError(error.message);
		}
	}
}
