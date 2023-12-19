import {
	Body,
	Controller,
	Post,
	Req,
	Res,
	HttpStatus,
	Get,
	HttpCode
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/DTO/create-user.dto';
import { GenerateTokensT } from '../token/types/generate-tokens.type';
import { Request, Response } from 'express';
import { TokensExpires } from '../token/config';
import { UserRDO } from '../user/RDO/user.rdo';
import { TOKENS_NAMES } from './consts';
import { Logger } from 'src/core/logger/Logger';
import { TokenService } from '../token/token.service';
import { LoginDTO } from './DTO/login.dto';
import ENDPOINTS from 'src/core/consts/endpoint';
const { AUTH: { BASE, LOGIN, LOGOUT, REFRESH, REGISTRATION } } = ENDPOINTS;

@Controller(BASE)
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly logger: Logger,
		private readonly tokenService: TokenService
	) {}

	@Post(REGISTRATION)
	@HttpCode(HttpStatus.OK)
	async registration(
		@Body() registrationDTO: CreateUserDTO,
		@Res() res: Response
	): Promise<Response<GenerateTokensT & { user: UserRDO }>> {
		this.logger.info('Запрос на registration');
		const payload = await this.authService.registration(registrationDTO);
		res.cookie(TOKENS_NAMES.REFRESH, payload.refreshToken, {
			maxAge: TokensExpires.REFRESH.milliseconds,
			httpOnly: true,
			secure: true,
		});
		return res.send(payload);
	}

	@Post(LOGIN)
	@HttpCode(HttpStatus.OK)
	async login(
		@Body() loginDTO: LoginDTO,
		@Res() res: Response
	): Promise<Response<GenerateTokensT & { user: UserRDO }>> {
		this.logger.info('Запрос на login');
		const payload = await this.authService.login(loginDTO);
		res.cookie(TOKENS_NAMES.REFRESH, payload.refreshToken, {
			maxAge: TokensExpires.REFRESH.milliseconds,
			httpOnly: true,
			secure: true,
		});
		this.logger.log(`Успешный login для пользователя ${payload.user.email}`);
		return res.send(payload);
		
	}

	@Post(LOGOUT)
	@HttpCode(HttpStatus.OK)
	async logout(
		@Req() req: Request,
		@Res() res: Response
	): Promise<Response<any, Record<string, any>>> {
		this.logger.info('Запрос на logout');
		const { refreshToken } = req.cookies;
		const payload = await this.authService.logout(refreshToken);
		res.clearCookie(TOKENS_NAMES.REFRESH);
		this.logger.log(`Успешный logout для пользователя ${payload.email}`);
		return res.json({ message: 'OK' });
	}

	@Get(REFRESH)
	@HttpCode(HttpStatus.OK)
	async refreshToken(
		@Req() req: Request,
		@Res() res: Response
	): Promise<Response<GenerateTokensT>> {
		this.logger.info('Запрос на обновление токена');
		const { refreshToken } = req.cookies;
		const tokens = await this.authService.refresh(refreshToken);
		const payload = await this.tokenService.validateRefreshToken(tokens.refreshToken);
		res.cookie(TOKENS_NAMES.REFRESH, tokens.refreshToken, {
			maxAge: TokensExpires.REFRESH.milliseconds,
			httpOnly: true,
			secure: true,
		});
		this.logger.log(`Успешное обновление токена для пользователя ${payload.email}`);
		return res.send(tokens);
	}
}
