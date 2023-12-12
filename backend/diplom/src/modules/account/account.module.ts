import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from './models/account.model';
import { AccountRepository } from './account.repository';
import { UserModule } from '../user/user.module';
import { Logger } from 'src/core/logger/Logger';

@Module({
	providers: [AccountService, AccountRepository, Logger],
	controllers: [AccountController],
	imports: [
		MongooseModule.forFeature([
			{ name: Account.name, schema: AccountSchema },
		]),
		forwardRef(() => UserModule)
	],
	exports: [AccountService, AccountRepository]
})
export class AccountModule {}
