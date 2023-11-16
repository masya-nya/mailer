import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import MailsInfo from 'src/consts/mailsInfo';

@Injectable()
export class YandexOAuthGuard extends AuthGuard(MailsInfo.Yandex.Strategy) {
    // Сервис не используется, но он необходим для работы с process.env в классе, от которого мы наследуемся
    constructor(private configService: ConfigService) {
        super();
    }
}
