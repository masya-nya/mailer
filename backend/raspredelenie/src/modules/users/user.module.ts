import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { Account, AccountSchema } from '../account/account.model';
import { AmoApiModule } from '../amo-api/amo-api.module';
import { Logger } from '../../core/logger/logger.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AmoApiService } from '../amo-api/amo-api.service';
import { AccountRepository } from '../account/account.repository';
import { WorkScheduleRepository } from '../work-schedule/work-schedule.repository';
import { WorkSchedule, WorkScheduleSchema } from '../work-schedule/work-schedule.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: WorkSchedule.name, schema: WorkScheduleSchema }]),
        AmoApiModule,
    ],
    controllers: [UserController],
    providers: [Logger, UserRepository, UserService, AmoApiService, WorkScheduleRepository, AccountRepository],
})
export class UserModule {}
