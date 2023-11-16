import { Injectable } from '@nestjs/common';
import { MarlboroService } from 'src/marlboroLogger/marlboro.service';
import { MailMessageId } from 'src/types/mailMessageId.dto';
import handleError from 'src/utils/handleError';
import { MarkMailDto } from './dto/mark-mail.dto';
import { MarkedMails } from './mark-mails.model';
import { MarkMailsRepository } from './mark-mails.repository';

@Injectable()
export class MarkMailsService {
    constructor(private readonly markMailsRepository: MarkMailsRepository, private readonly logger: MarlboroService) {}

    public async markMail({ email, msgIds, markIds }: MarkMailDto): Promise<void> {
        const loggerContext = `${MarkMailsService.name}/${this.markMail.name}`;

        try {
            await this.markMailsRepository.markMail(email, msgIds, markIds);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getMarkedMail(email: string, msgId: string): Promise<MarkedMails | null> {
        const loggerContext = `${MarkMailsService.name}/${this.getMarkedMail.name}`;

        try {
            return await this.markMailsRepository.getMarkedMail(email, msgId);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getMailsByMarkId(email: string, markId: string): Promise<MailMessageId[]> {
        const loggerContext = `${MarkMailsService.name}/${this.getMailsByMarkId.name}`;
        try {
            return await this.markMailsRepository.getMailsByMarkId(email, markId);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async unMarkMail({ email, msgIds, markIds }: MarkMailDto): Promise<void> {
        const loggerContext = `${MarkMailsService.name}/${this.unMarkMail.name}`;

        try {
            await this.markMailsRepository.unMarkMail(email, msgIds, markIds);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async unMarkAll(email: string, markIds: string[]): Promise<void> {
        const loggerContext = `${MarkMailsService.name}/${this.unMarkAll.name}`;

        try {
            await this.markMailsRepository.unMarkAll(email, markIds);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async updateMarkedMailSeq(email: string, msgId: string, msgSeq: number): Promise<void> {
        const loggerContext = `${MarkMailsService.name}/${this.updateMarkedMailSeq.name}`;

        try {
            await this.markMailsRepository.updateMarkedMailSeq(email, msgId, msgSeq);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
