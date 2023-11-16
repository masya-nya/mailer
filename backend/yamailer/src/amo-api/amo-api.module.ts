import { Module } from '@nestjs/common';
import { AmoApiService } from './amo-api.service';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../account/account.model';
import { AccountRepository } from '../account/account.repository';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
    providers: [AmoApiService, AccountRepository, ConfigService, MarlboroService],
    exports: [AmoApiService],
})
export class AmoApiModule {}
