import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UsersRoles } from 'src/roles/users-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/posts.model';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		forwardRef(() => AuthModule),
		SequelizeModule.forFeature([User, Role, UsersRoles, Post]),
		RolesModule
	],
	exports: [UsersService]
})
export class UsersModule {}
