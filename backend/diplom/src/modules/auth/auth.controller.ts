import { Body, Controller, Post, Req, Res, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/DTO/create-user.dto';
import { GenerateTokensT } from '../token/types/generate-tokens.type';
import { ENDPOINTS } from 'src/core/consts/endpoint';
import { Request, Response } from 'express';
import { TokensExpires } from '../token/config';
import { UserRDO } from '../user/RDO/user.rdo';
import { TOKENS_NAMES } from './consts';

@Controller(ENDPOINTS.AUTH.BASE)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post(ENDPOINTS.AUTH.REGISTRATION)
	async registration(
		@Body() registrationDTO: CreateUserDTO,
		@Res() res: Response
	): Promise<Response<GenerateTokensT & { user: UserRDO }>> {
		const payload = await this.authService.registration(registrationDTO);
		res.cookie(TOKENS_NAMES.REFRESH, payload.refreshToken, {
			maxAge: TokensExpires.REFRESH.milliseconds,
			httpOnly: true,
			secure: true,
		});
		return res.send(payload);
	}

	@Post(ENDPOINTS.AUTH.LOGIN)
	async login(
		@Body() registrationDTO: CreateUserDTO,
		@Res() res: Response
	): Promise<Response<GenerateTokensT & { user: UserRDO }>> {
		const payload = await this.authService.login(registrationDTO);
		res.cookie(TOKENS_NAMES.REFRESH, payload.refreshToken, {
			maxAge: TokensExpires.REFRESH.milliseconds,
			httpOnly: true,
			secure: true,
		});
		return res.send(payload);
	}

	@Post(ENDPOINTS.AUTH.LOGOUT)
	async logout(
		@Req() req: Request,
		@Res() res: Response
	): Promise<Response<any, Record<string, any>>> {
		const { refreshToken } = req.cookies;
		await this.authService.logout(refreshToken);
		res.clearCookie(TOKENS_NAMES.REFRESH);
		return res.status(HttpStatus.OK).json({ message: 'OK' });
	}

	@Get(ENDPOINTS.AUTH.REFRESH)
	async refreshToken(
		@Req() req: Request,
		@Res() res: Response
	):Promise<Response<GenerateTokensT>> {
		const { refreshToken } = req.cookies;
		const tokens = await this.authService.refresh(refreshToken);
		res.cookie(TOKENS_NAMES.REFRESH, tokens.refreshToken, {
			maxAge: TokensExpires.REFRESH.milliseconds,
			httpOnly: true,
			secure: true,
		});
		return res.send(tokens);

	}
}
