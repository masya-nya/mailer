import { Module } from '@nestjs/common';
import { MailFolderImapController } from './mail-folder-imap.controller';
import { MailFolderImapService } from './mail-folder-imap.service';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import { ImapService } from '../imap/imap.service';
import { MailerModule } from '../mailers/mailer.module';

@Module({
    imports: [MailerModule],
    controllers: [MailFolderImapController],
    providers: [MailFolderImapService, MarlboroService, ImapService],
})
export class MailFolderImapModule {}
