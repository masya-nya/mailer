import { Module } from '@nestjs/common';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from 'src/modules/account/account.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TokenModule } from 'src/modules/token/token.module';
import { UserModule } from 'src/modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from 'src/modules/role/role.module';
import { AccountUserModule } from 'src/modules/account-user/account-user.module';
import { MailAuthModule } from 'src/modules/mail-auth/mail-auth.module';
import { EmailModule } from 'src/modules/email/email.module';
import { MailsModule } from 'src/modules/mails/mails.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: RateLimiterGuard,
		},
	],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
		}),
		RateLimiterModule.register({
			points: 10, // Number of points
			duration: 1, // Per second(s)
			errorMessage: 'Слишком часто спрашиваешь'
		}),
		MongooseModule.forRoot(process.env.MONGODB_HOST),
		AccountModule,
		UserModule,
		AuthModule,
		TokenModule,
		RoleModule,
		AccountUserModule,
		MailAuthModule,
		EmailModule,
		MailsModule,
	],
})
export class AppModule {}
