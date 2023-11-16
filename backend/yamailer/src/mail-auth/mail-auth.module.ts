import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MailAuthController } from './mail-auth.controller';
import { MailAuthService } from './mail-auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { SaveSessionReferInfoMiddleware } from './middleware/save-session-refer-info.middleware';
import { MailerModule } from 'src/mailers/mailer.module';
import { YandexStrategy } from './strategy/yandex.strategy';
import { MailruStrategy } from './strategy/mailru.strategy';
import { MarlboroService } from './../marlboroLogger/marlboro.service';
import { Endpoints } from 'src/consts/endpoints';

@Module({
    imports: [MailerModule],
    providers: [MailAuthService, GoogleStrategy, YandexStrategy, MailruStrategy, MarlboroService],
    controllers: [MailAuthController],
})
export class MailAuthModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SaveSessionReferInfoMiddleware)
            .forRoutes(
                { path: `${Endpoints.MailAuth.Root}/${Endpoints.MailAuth.Google.Auth}`, method: RequestMethod.GET },
                { path: `${Endpoints.MailAuth.Root}/${Endpoints.MailAuth.Yandex.Auth}`, method: RequestMethod.GET },
                { path: `${Endpoints.MailAuth.Root}/${Endpoints.MailAuth.Mailru.Auth}`, method: RequestMethod.GET }
            );
    }
}
