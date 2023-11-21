import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from 'src/core/logger/logger.service';
import { Account, AccountSchema } from '../account/account.model';
import { AccountRepository } from '../account/account.repository';
import { WorkScheduleController } from './work-schedule.controller';
import { WorkSchedule, WorkScheduleSchema } from './work-schedule.model';
import { WorkScheduleRepository } from './work-schedule.repository';
import { WorkScheduleService } from './work-schedule.service';
import { User, UserSchema } from '../users/user.model';
import { UserRepository } from '../users/user.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: WorkSchedule.name, schema: WorkScheduleSchema }]),
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [WorkScheduleController],
    providers: [WorkScheduleService, WorkScheduleRepository, AccountRepository, UserRepository, Logger],
})
export class WorkScheduleModule {}
