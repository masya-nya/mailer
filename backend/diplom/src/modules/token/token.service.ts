import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtCreateDTO } from './DTO/jwt-create.dto';
import { GenerateTokensT } from './types/generate-tokens.type';

@Injectable()
export class TokenService {
	constructor(private jwtService: JwtService) {}

	generateTokens(payload: JwtCreateDTO):GenerateTokensT {
		const accessToken = this.jwtService.sign(payload, {
			secret: process.env.ACCESS_TOKEN_KEY,
			expiresIn: '30m',
		});
		const refreshToken = this.jwtService.sign(payload, {
			secret: process.env.REFRESH_TOKEN_KEY,
			expiresIn: '30d',
		});
		return {
			accessToken,
			refreshToken
		};
	}
}
