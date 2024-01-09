import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MailAuthController } from './mail-auth.controller';
import { MailAuthService } from './mail-auth.service';
import { SaveSessionReferInfoMiddleware } from './middleware/save-session-refer-info.middleware';
import { YandexStrategy } from './strategy/yandex.strategy';
import ENDPOINTS from 'src/core/consts/endpoint';
import { Logger } from 'src/core/logger/Logger';
import { EmailModule } from '../email/email.module';
import { GoogleStrategy } from './strategy/google.strategy';
const {
	MAIL_AUTH: { BASE, YANDEX, GOOGLE },
} = ENDPOINTS;

@Module({
	imports: [EmailModule],
	providers: [MailAuthService, YandexStrategy, GoogleStrategy, Logger],
	controllers: [MailAuthController],
})
export class MailAuthModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(SaveSessionReferInfoMiddleware).forRoutes(
			{
				path: `${BASE}/${YANDEX.AUTH}`,
				method: RequestMethod.GET,
			},
			{
				path: `${BASE}/${GOOGLE.AUTH}`,
				method: RequestMethod.GET,
			}
		);
	}
}
