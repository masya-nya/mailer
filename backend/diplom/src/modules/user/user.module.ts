import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { AccountModule } from '../account/account.module';

@Module({
	providers: [UserService, UserRepository],
	controllers: [UserController],
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema }
		]),
		forwardRef(() => AccountModule)
	],
	exports: [UserService]
})
export class UserModule {}