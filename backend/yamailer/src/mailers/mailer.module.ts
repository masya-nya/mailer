import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import { MailerController } from './mailer.controller';
import { UserMailers, UserMailerSchema } from './mailer.model';
import { MailerRepository } from './mailer.repository';
import { MailerService } from './mailer.service';
import { MailMarkModule } from '../mail-mark/mail-mark.module';
import { ConfigService } from '@nestjs/config';
import { ImapService } from 'src/imap/imap.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserMailers.name, schema: UserMailerSchema }]), MailMarkModule],
    providers: [MailerService, MailerRepository, ImapService, ConfigService, MarlboroService],
    controllers: [MailerController],
    exports: [MailerService],
})
export class MailerModule {}
