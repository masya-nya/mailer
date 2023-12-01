import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/api-error.exception';
import { TokenService } from './../../modules/token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

	constructor(
		private tokenService: TokenService
	){}

	async use(req: Request, res: Response, next: NextFunction):Promise<void>{
		try {
			const authHeader = req.headers.authorization;
			if (!authHeader) {
				return next(ApiError.Unauthorized());
			}

			const accessToken = authHeader.split(' ')[1];
			if (!accessToken) {
				return next(ApiError.Unauthorized());
			}

			const payload = await this.tokenService.validateAccessToken(accessToken);
			if (!payload) {
				return next(ApiError.Unauthorized());
			}
			next();
		} catch(e) {
			return next(ApiError.Unauthorized());
		}
	}
}