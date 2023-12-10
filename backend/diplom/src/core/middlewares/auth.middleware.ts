import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/api-error.exception';
import { TokenService } from './../../modules/token/token.service';
import { Logger } from '../logger/Logger';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(
		private readonly tokenService: TokenService,
		private readonly logger: Logger
	) {}

	async use(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const authHeader = req.headers.authorization;
			if (!authHeader) {
				this.logger.warn('Пользователь не прошел authMiddleware');
				return next(ApiError.Unauthorized());
			}

			const accessToken = authHeader.split(' ')[1];
			if (!accessToken) {
				this.logger.warn('Пользователь не прошел authMiddleware');
				return next(ApiError.Unauthorized());
			}

			const payload =
				await this.tokenService.validateAccessToken(accessToken);
			if (!payload) {
				this.logger.warn('Пользователь не прошел authMiddleware');
				return next(ApiError.Unauthorized());
			}
			next();
		} catch (e) {
			this.logger.warn('Пользователь не прошел authMiddleware');
			return next(ApiError.Unauthorized());
		}
	}
}
