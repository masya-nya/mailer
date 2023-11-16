import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { UsersRoles } from './roles/users-roles.model';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { Post } from './posts/posts.model';
import * as path from 'path';

@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username:  process.env.POSTGRES_USER,
			password:  process.env.POSTGRES_PASSWORD,
			database:  process.env.POSTGRES_DB,
			models: [User, Role, UsersRoles, Post],
			autoLoadModels: true
		}),
		ServeStaticModule.forRoot(
			{
				rootPath: path.resolve(__dirname, 'static')
			}
		),
		UsersModule,
		RolesModule,
		AuthModule,
		PostsModule,
		FilesModule,
	],
})
export class AppModule {}
