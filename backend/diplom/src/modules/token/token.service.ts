import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensT } from './types/generate-tokens.type';
import { JwtCreateDTO } from './DTO/jwt-create.dto';
import { AddTokenDTO } from './DTO/add-token.dto';
import { TokenRepository } from './token.repository';
import { Token, TokenDocument } from './models/token.model';
import { TokensExpires } from './config';
import { ModelWithId } from 'src/core/types';

@Injectable()
export class TokenService {
	constructor(
		private jwtService: JwtService,
		private tokenRepository: TokenRepository
	) {}

	async generateTokens(payload: JwtCreateDTO):Promise<GenerateTokensT> {
		const accessToken = await this.jwtService.signAsync(payload, {
			secret: process.env.ACCESS_TOKEN_KEY,
			expiresIn: TokensExpires.ACCESS.value,
		});
		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: process.env.REFRESH_TOKEN_KEY,
			expiresIn: TokensExpires.REFRESH.value,
		});
		return {
			accessToken,
			refreshToken
		};
	}

	async saveToken({ userId, refreshToken }: AddTokenDTO):Promise<TokenDocument> {
		const tokenData = await this.tokenRepository.find({ userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return await tokenData.save();
		}
		const token = await this.tokenRepository.saveToken({ refreshToken, userId });
		return token;
	}

	async find(findDTO:  Partial<ModelWithId<Token>>):Promise<TokenDocument> {
		const token = await this.tokenRepository.find({ ...findDTO });
		return token;
	}

	async removeToken(refreshToken: string):Promise<boolean> {
		const isDelete = await this.tokenRepository.removeToken(refreshToken);
		return isDelete;
	}

	async validateAccessToken(accessToken: string):Promise<JwtCreateDTO | null> {
		try {
			const payload = this.jwtService.verify(accessToken, { secret: process.env.ACCESS_TOKEN_KEY });
			return payload;
		} catch(e) {
			return null;
		}
	}

	async validateRefreshToken(refreshToken: string):Promise<JwtCreateDTO | null> {
		try {
			const payload = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_KEY });
			return payload;
		} catch(e) {
			return null;
		}
	}
}
