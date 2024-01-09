import { Module, forwardRef } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './models/role.model';
import { RoleRepository } from './role.repository';
import { AccountModule } from '../account/account.module';
import { Logger } from 'src/core/logger/Logger';

@Module({
	controllers: [RoleController],
	providers: [RoleService, RoleRepository, Logger],
	imports: [
		MongooseModule.forFeature([
			{ name: Role.name, schema: RoleSchema }
		]),
		forwardRef(() => AccountModule)
	],
	exports: [RoleService]
})
export class RoleModule {}
