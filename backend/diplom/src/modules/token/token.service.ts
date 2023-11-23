import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensT } from './types/generate-tokens.type';
import { JwtCreateDTO } from './DTO/jwt-create.dto';
import { AddTokenDTO } from './DTO/add-token.dto';
import { TokenRepository } from './token.repository';
import { TokenDocument } from './token.model';
import { TokensExpires } from './config';

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
		const tokenData = await this.tokenRepository.findByUserId(userId);
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await this.tokenRepository.saveToken({ refreshToken, userId });
		return token;
	}

}
