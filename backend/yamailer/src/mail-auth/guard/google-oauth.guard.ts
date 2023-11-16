import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import MailsInfo from 'src/consts/mailsInfo';
import { QueryConfig } from '../options/google.options';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(MailsInfo.Google.Strategy) {
    // Сервис не используется, но он необходим для работы с process.env в классе, от которого мы наследуемся
    constructor(private configService: ConfigService) {
        super({
            ...QueryConfig,
        });
    }
}
