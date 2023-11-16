import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MarkMailsService } from 'src/marking-mail/mark-mails.service';
import handleError from 'src/utils/handleError';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import { MailMarkCreateDto } from './dto/mail-mark-create.dto';
import { MailMarkDeleteDto } from './dto/mail-mark-delete.dto';
import { MailMarkEditDto } from './dto/mail-mark-edit.dto';
import { MailMarkGetAllDto } from './dto/mail-mark-getAll.dto';
import { MailMarkDocument } from './mail-mark.model';
import { MailMarkRepository } from './mail-mark.repository';

@Injectable()
export class MailMarkService {
    constructor(
        private readonly mailMarkRepository: MailMarkRepository,
        private readonly markMailsService: MarkMailsService,
        private readonly logger: MarlboroService
    ) {}

    public async initAccount(email: string): Promise<void> {
        const loggerContext = `${MailMarkService.name}/${this.initAccount.name}`;

        try {
            await this.mailMarkRepository.initAccount(email);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async create({ email, color, name }: MailMarkCreateDto): Promise<MailMarkDocument> {
        const loggerContext = `${MailMarkService.name}/${this.create.name}`;

        try {
            await this.mailMarkRepository.createMark(email, { color, name });

            const userMarks = await this.mailMarkRepository.getMarks(email);
            return userMarks[userMarks.length - 1];
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getAll({ email }: MailMarkGetAllDto): Promise<MailMarkDocument[]> {
        const loggerContext = `${MailMarkService.name}/${this.getAll.name}`;

        try {
            const mailMarks = await this.mailMarkRepository.getMarks(email);

            return mailMarks;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async delete({ email, markId }: MailMarkDeleteDto): Promise<void> {
        const loggerContext = `${MailMarkService.name}/${this.delete.name}`;

        try {
            await this.mailMarkRepository.delete(email, markId);
            await this.markMailsService.unMarkAll(email, [markId]);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async edit({ email, markId, mark }: MailMarkEditDto): Promise<MailMarkDocument> {
        const loggerContext = `${MailMarkService.name}/${this.edit.name}`;

        try {
            await this.mailMarkRepository.edit(email, markId, mark);

            const userMarks = await this.mailMarkRepository.getMarks(email);
            if (!userMarks.length) {
                throw new HttpException('No marks to editing', HttpStatus.BAD_REQUEST);
            }

            const editedMark = userMarks.find((mark) => mark._id.toString() === markId);
            if (!editedMark) {
                throw new HttpException('Wrong markId ', HttpStatus.BAD_REQUEST);
            }

            return editedMark;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
