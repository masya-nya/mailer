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
import { ENDPOINTS } from 'src/core/consts/endpoint';
import { Request, Response } from 'express';
import { TokensExpires } from '../token/config';
import { UserRDO } from '../user/RDO/user.rdo';
import { TOKENS_NAMES } from './consts';
import { Logger } from 'src/core/logger/Logger';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { TokenService } from '../token/token.service';

@Controller(ENDPOINTS.AUTH.BASE)
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly logger: Logger,
		private readonly tokenService: TokenService
	) {}

	@Post(ENDPOINTS.AUTH.REGISTRATION)
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

	@Post(ENDPOINTS.AUTH.LOGIN)
	@HttpCode(HttpStatus.OK)
	async login(
		@Body() registrationDTO: CreateUserDTO,
		@Res() res: Response
	): Promise<Response<GenerateTokensT & { user: UserRDO }>> {
		this.logger.info('Запрос на login');
		try {
			const payload = await this.authService.login(registrationDTO);
			res.cookie(TOKENS_NAMES.REFRESH, payload.refreshToken, {
				maxAge: TokensExpires.REFRESH.milliseconds,
				httpOnly: true,
				secure: true,
			});
			this.logger.log(`Успешный login для пользователя ${payload.user.email}`);
			return res.send(payload);
		} catch(e) {
			throw ApiError.InternalServerError(e.message);
		}
		
	}

	@Post(ENDPOINTS.AUTH.LOGOUT)
	@HttpCode(HttpStatus.OK)
	async logout(
		@Req() req: Request,
		@Res() res: Response
	): Promise<Response<any, Record<string, any>>> {
		this.logger.info('Запрос на logout');
		try {
			const { refreshToken } = req.cookies;
			const payload = await this.authService.logout(refreshToken);
			res.clearCookie(TOKENS_NAMES.REFRESH);
			this.logger.log(`Успешный logout для пользователя ${payload.email}`);
			return res.json({ message: 'OK' });
		} catch(e) {
			throw ApiError.InternalServerError(e.message);
		}
	}

	@Get(ENDPOINTS.AUTH.REFRESH)
	@HttpCode(HttpStatus.OK)
	async refreshToken(
		@Req() req: Request,
		@Res() res: Response
	): Promise<Response<GenerateTokensT>> {
		this.logger.info('Запрос на обновление токена');
		try {
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
		} catch(e) {
			throw ApiError.InternalServerError(e.message);
		}
	}
}
