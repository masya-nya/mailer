import { Module, forwardRef, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { AccountModule } from '../account/account.module';
import { AuthMiddleware } from 'src/core/middlewares/auth.middleware';
import { ENDPOINTS } from 'src/core/consts/endpoint';
import { TokenModule } from '../token/token.module';
import { Logger } from 'src/core/logger/Logger';

@Module({
	providers: [UserService, UserRepository, Logger],
	controllers: [UserController],
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema }
		]),
		forwardRef(() => AccountModule),
		TokenModule
	],
	exports: [UserService, UserRepository]
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer):void {
		consumer
			.apply(AuthMiddleware)
			.forRoutes(ENDPOINTS.USER.BASE);
	}
}