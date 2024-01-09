import { Module } from '@nestjs/common';
import { AccountUserController } from './account-user.controller';
import { AccountUserService } from './account-user.service';
import { UserModule } from '../user/user.module';
import { AccountModule } from '../account/account.module';
import { RoleModule } from '../role/role.module';
import { Logger } from 'src/core/logger/Logger';
import { EmailModule } from '../email/email.module';

@Module({
	controllers: [AccountUserController],
	providers: [AccountUserService, Logger],
	imports: [
		UserModule,
		AccountModule,
		RoleModule,
		EmailModule
	]
})
export class AccountUserModule {}
