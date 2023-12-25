import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { MailsService } from './mails.service';
import { ImapService } from 'src/core/services/imap/imap.service';
import { Logger } from 'src/core/logger/Logger';
import { MailsController } from './mails.controller';
import { SmtpService } from 'src/core/services/smtp/smtp.service';


@Module({
	controllers: [MailsController],
	providers: [ MailsService, ImapService, SmtpService, Logger],
	imports: [EmailModule]
})
export class MailsModule {}