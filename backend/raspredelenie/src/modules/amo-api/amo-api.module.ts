import { Module } from '@nestjs/common';
import { AmoApiService } from './amo-api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountRepository } from '../account/account.repository';
import { Logger } from '../../core/logger/logger.service';
import { Account, AccountSchema } from '../account/account.model';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
    providers: [AmoApiService, AccountRepository, ConfigService, Logger],
    exports: [AmoApiService],
})
export class AmoApiModule {}
