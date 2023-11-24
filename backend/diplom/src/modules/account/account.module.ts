import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from './account.model';
import { AccountRepository } from './account.repository';
import { UserModule } from '../user/user.module';

@Module({
	providers: [AccountService, AccountRepository],
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
