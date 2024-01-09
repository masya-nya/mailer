import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { Logger } from 'src/core/logger/Logger';

@Module({
	controllers: [AuthController],
	providers: [AuthService, Logger],
	imports: [
		UserModule,
		TokenModule
	],
})
export class AuthModule {}
