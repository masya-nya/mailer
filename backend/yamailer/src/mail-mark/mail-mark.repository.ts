import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import handleError from 'src/utils/handleError';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import { MailMark, MailMarkDocument, UserMailMark } from './mail-mark.model';

@Injectable()
export class MailMarkRepository {
    constructor(
        @InjectModel(UserMailMark.name)
        private readonly mailMarkModel: Model<UserMailMark>,
        private readonly logger: MarlboroService
    ) {}

    public async initAccount(email: string): Promise<void> {
        const loggerContext = `${UserMailMark.name}/${this.initAccount.name}`;

        try {
            const userMarks = await this.mailMarkModel.findOne({ email }).lean();
            if (!userMarks) {
                this.mailMarkModel.create({ email, mailMarks: [] });
            }
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async createMark(email: string, mark: MailMark): Promise<void> {
        const loggerContext = `${UserMailMark.name}/${this.createMark.name}`;

        try {
            const userMarks = await this.mailMarkModel.findOne({ email }).lean();

            if (!userMarks) {
                await this.mailMarkModel.create({ email, mailMarks: [mark] });
            } else {
                await this.mailMarkModel.updateOne({ email }, { $push: { mailMarks: mark } });
            }
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getMarks(email: string): Promise<MailMarkDocument[]> {
        const loggerContext = `${UserMailMark.name}/${this.getMarks.name}`;

        try {
            const userMarks = await this.mailMarkModel.findOne({ email }).lean();
            if (!userMarks) {
                throw new HttpException('No user with this email', HttpStatus.NOT_FOUND);
            }
            return userMarks.mailMarks || [];
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async delete(email: string, markId: string): Promise<void> {
        const loggerContext = `${UserMailMark.name}/${this.delete.name}`;

        try {
            await this.mailMarkModel.updateOne(
                { email },
                {
                    $pull: { mailMarks: { _id: markId } },
                }
            );
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async edit(email: string, markId: string, mark: MailMark): Promise<void> {
        const loggerContext = `${UserMailMark.name}/${this.edit.name}`;

        try {
            await this.mailMarkModel.updateOne(
                { email },
                {
                    ['mailMarks.$[mark].name']: mark.name,
                    ['mailMarks.$[mark].color']: mark.color,
                },
                {
                    arrayFilters: [{ 'mark._id': markId }],
                }
            );
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
