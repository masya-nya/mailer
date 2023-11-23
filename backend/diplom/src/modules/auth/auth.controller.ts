import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/DTO/create-user.dto';
import { GenerateTokensT } from '../token/types/generate-tokens.type';
import { ENDPOINTS } from 'src/core/consts/endpoint';
import { UserDocument } from '../user/user.model';
import { Response } from 'express';
import { TokensExpires } from '../token/config';

@Controller(ENDPOINTS.AUTH.BASE)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post(ENDPOINTS.AUTH.LOGIN)
	login(@Body() registrationDTO: CreateUserDTO): Promise<GenerateTokensT> {
		return this.authService.login(registrationDTO);
	}

	@Post(ENDPOINTS.AUTH.REGISTRATION)
	async registration(
		@Body() registrationDTO: CreateUserDTO,
		@Res() res: Response
	): Promise<Response<GenerateTokensT & { user: UserDocument }>> {
		const payload = await this.authService.registration(registrationDTO);
		res.cookie(
			'refreshToken',
			payload.refreshToken,
			{
				maxAge: TokensExpires.REFRESH.milliseconds,
				httpOnly: true,
				secure: true
			}
		);
		return res.send(payload);
	}
}
