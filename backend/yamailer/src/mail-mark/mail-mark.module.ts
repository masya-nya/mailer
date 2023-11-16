import { Module } from '@nestjs/common';
import { MailMarkService } from './mail-mark.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import { UserMailMarkSchema, UserMailMark } from './mail-mark.model';
import { MailMarkRepository } from './mail-mark.repository';
import { MailMarkController } from './mail-mark.controller';
import { MarkMailsModule } from 'src/marking-mail/mark-mails.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserMailMark.name, schema: UserMailMarkSchema }]), MarkMailsModule],
    providers: [MailMarkService, MailMarkRepository, MarlboroService],
    controllers: [MailMarkController],
    exports: [MailMarkService],
})
export class MailMarkModule {}
