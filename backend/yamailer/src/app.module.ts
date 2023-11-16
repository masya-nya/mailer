import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MarlboroService } from './marlboroLogger/marlboro.service';
import { AmoApiModule } from './amo-api/amo-api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailAuthModule } from './mail-auth/mail-auth.module';
import { MailMarkModule } from './mail-mark/mail-mark.module';
import { MailerModule } from './mailers/mailer.module';
import { MailsModule } from './mails/mails.module';
import * as Joi from 'joi';
import { AppConfigSchema } from './app.schema';
import { MailFolderImapModule } from './mail-folder-imap/mail-folder-imap.module';
import { MarkMailsModule } from './marking-mail/mark-mails.module';
import { AmoEntitiesModule } from './amo-entities/amo-entities.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            validationSchema: Joi.object<AppConfigSchema, true>({
                PORT: Joi.number().required(),
                MONGO_CONNECT: Joi.string().required(),
                MONGO_NAME: Joi.string().required(),
                CLIENT_ID: Joi.string().required(),
                CLIENT_SECRET: Joi.string().required(),
                REDIRECT_URI: Joi.string().required(),
                SERVER_URI: Joi.string().required(),
                GOOGLE_CLIENT_ID: Joi.string().required(),
                GOOGLE_CLIENT_SECRET: Joi.string().required(),
                SESSIONS_SECRET_KEY: Joi.string().required(),
                YANDEX_CLIENT_ID: Joi.string().required(),
                YANDEX_CLIENT_SECRET: Joi.string().required(),
                MAILRU_CLIENT_ID: Joi.string().required(),
                MAILRU_CLIENT_SECRET: Joi.string().required(),
            }),
        }),
        MongooseModule.forRoot(process.env.MONGO_CONNECT, {
            dbName: process.env.MONGO_NAME,
        }),
        ScheduleModule.forRoot(),
        AmoApiModule,
        AccountModule,
        MailAuthModule,
        MailMarkModule,
        MailerModule,
        MailsModule,
        MailFolderImapModule,
        MarkMailsModule,
        AmoEntitiesModule,
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService, MarlboroService],
    exports: [ConfigService, MarlboroService],
})
export class AppModule {}
