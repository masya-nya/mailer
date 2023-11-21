import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Logger } from '../core/logger/logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { AmoApiModule } from '../modules/amo-api/amo-api.module';
import { AccountModule } from '../modules/account/account.module';
import * as process from 'process';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from 'src/modules/users/user.module';
import { DistributionTemplateModule } from 'src/modules/distribution-templates/distribution-template.module';
import { TriggerModule } from 'src/modules/triggers/trigger.module';
import { WorkScheduleModule } from 'src/modules/work-schedule/work-schedule.module';
import { WebhookQueueModule } from 'src/modules/webhook-queue/webhook-queue.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                MONGO_CONNECT: Joi.string().required(),
                MONGO_NAME: Joi.string().required(),
                CLIENT_UUID: Joi.string().required(),
                CLIENT_SECRET: Joi.string().required(),
                REDIRECT_URI: Joi.string().required(),
            }),
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('MONGO_CONNECT'),
                dbName: configService.get('MONGO_NAME'),
            }),
            inject: [ConfigService],
        }),
        ScheduleModule.forRoot(),
        AccountModule,
        UserModule,
        AmoApiModule,
        DistributionTemplateModule,
        WorkScheduleModule,
        WebhookQueueModule,
        TriggerModule,
    ],
    controllers: [AppController],
    providers: [AppService, Logger],
    exports: [Logger],
})
export class AppModule {}
