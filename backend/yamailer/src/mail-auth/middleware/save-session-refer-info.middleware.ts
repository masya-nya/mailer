import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SaveSessionReferInfoMiddleware implements NestMiddleware {
    public use(req: Request, _res: Response, next: NextFunction) {
        req.session['amoid'] = req.query.amoid || '';
        req.session['managerId'] = req.query.managerId || '';
        req.session['redirectClientUri'] = req.query.redirectClientUri || 'https://www.amocrm.ru/';
        next();
    }
}
