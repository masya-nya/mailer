import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SaveSessionReferInfoMiddleware implements NestMiddleware {
	public use(req: Request, _res: Response, next: NextFunction): void {
		req.session['redirectClientUri'] = req.query.redirectClientUri;
		req.session['accountId'] = req.query.accountId;
		next();
	}
}