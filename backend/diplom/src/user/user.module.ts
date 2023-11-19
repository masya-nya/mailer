import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { UserRepository } from './user.repository';

@Module({
	providers: [UserService, UserRepository],
	controllers: [UserController],
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema }
		]),
	],
	exports: [UserService]
})
export class UserModule {}
