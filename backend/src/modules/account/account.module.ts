import { MiddlewareConsumer, Module, NestModule, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from './models/account.model';
import { AccountRepository } from './account.repository';
import { UserModule } from '../user/user.module';
import { Logger } from 'src/core/logger/Logger';
import { AuthMiddleware } from 'src/core/middlewares/auth.middleware';
import ENDPOINTS from 'src/core/consts/endpoint';
import { TokenModule } from '../token/token.module';
import { RoleModule } from '../role/role.module';

@Module({
	providers: [AccountService, AccountRepository, Logger],
	controllers: [AccountController],
	imports: [
		MongooseModule.forFeature([
			{ name: Account.name, schema: AccountSchema },
		]),
		forwardRef(() => UserModule),
		forwardRef(() => RoleModule),
		TokenModule
	],
	exports: [AccountService, AccountRepository]
})
export class AccountModule implements NestModule {
	configure(consumer: MiddlewareConsumer):void {
		consumer
			.apply(AuthMiddleware)
			.forRoutes(ENDPOINTS.ACCOUNT.BASE);
	}
}
