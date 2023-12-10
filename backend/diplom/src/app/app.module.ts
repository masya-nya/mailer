import { Module } from '@nestjs/common';
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

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`
		}),
		MongooseModule.forRoot(process.env.MONGODB_HOST),
		AccountModule,
		UserModule,
		AuthModule,
		TokenModule,
		RoleModule,
		AccountUserModule

	],
})
export class AppModule {}
