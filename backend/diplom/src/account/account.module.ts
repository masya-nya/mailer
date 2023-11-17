import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.model';
import { AccountRepository } from './account.repository';
import { UserModule } from 'src/user/user.module';

@Module({
	providers: [AccountService, AccountRepository],
	controllers: [AccountController],
	imports: [
		MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
		UserModule
	],
})
export class AccountModule {}
