import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarlboroService } from 'src/marlboroLogger/marlboro.service';
import { MarkMailsController } from './mark-mail.controller';
import { MarkedMails, MarkedMailsSchema } from './mark-mails.model';
import { MarkMailsRepository } from './mark-mails.repository';
import { MarkMailsService } from './mark-mails.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: MarkedMails.name, schema: MarkedMailsSchema }])],
    providers: [MarkMailsService, MarkMailsRepository, MarlboroService],
    controllers: [MarkMailsController],
    exports: [MarkMailsService],
})
export class MarkMailsModule {}
