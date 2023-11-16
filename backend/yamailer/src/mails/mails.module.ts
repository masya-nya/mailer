import { Module } from '@nestjs/common';
import { ImapService } from 'src/imap/imap.service';
import { MailerModule } from 'src/mailers/mailer.module';
import { MarkMailsModule } from 'src/marking-mail/mark-mails.module';
import { MarlboroService } from 'src/marlboroLogger/marlboro.service';
import { SmtpService } from 'src/smtp/smtp.service';
import { MailsController } from './mails.controller';
import { MailsService } from './mails.service';

@Module({
    imports: [MailerModule, MarkMailsModule],
    providers: [MailsService, ImapService, SmtpService, MarlboroService],
    controllers: [MailsController],
})
export class MailsModule {}
