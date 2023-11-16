import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarlboroService } from 'src/marlboroLogger/marlboro.service';
import { MailMessageId } from 'src/types/mailMessageId.dto';
import handleError from 'src/utils/handleError';
import { MarkedMails } from './mark-mails.model';

@Injectable()
export class MarkMailsRepository {
    constructor(
        @InjectModel(MarkedMails.name)
        private readonly markedMailsModel: Model<MarkedMails>,
        private readonly logger: MarlboroService
    ) {}

    public async markMail(email: string, msgIds: MailMessageId[], markIds: string[]): Promise<void> {
        const loggerContext = `${MarkedMails.name}/${this.markMail.name}`;

        try {
            for (const msgId of msgIds) {
                const markedMail = await this.markedMailsModel.findOne({ email, msgId: msgId.msgId }).lean();
                if (!markedMail) {
                    await this.markedMailsModel.create({ email, msgId: msgId.msgId, msgSeq: msgId.msgSeq, markIds });
                } else {
                    await this.markedMailsModel.updateOne(
                        { email, msgId: msgId.msgId, msgSeq: msgId.msgSeq },
                        { $addToSet: { markIds: { $each: markIds } } }
                    );
                }
            }
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getMarkedMail(email: string, msgId: string): Promise<MarkedMails | null> {
        const loggerContext = `${MarkedMails.name}/${this.getMarkedMail.name}`;

        try {
            const markedMail = await this.markedMailsModel.findOne({ email, msgId }).lean();
            return markedMail || null;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async unMarkMail(email: string, msgIds: MailMessageId[], markIds: string[]): Promise<void> {
        const loggerContext = `${MarkedMails.name}/${this.unMarkMail.name}`;

        try {
            for (const msgId of msgIds) {
                await this.markedMailsModel.updateOne(
                    { email, msgId: msgId.msgId },
                    {
                        $pull: { markIds: { $in: markIds } },
                    }
                );
            }
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async unMarkAll(email: string, markIds: string[]): Promise<void> {
        const loggerContext = `${MarkedMails.name}/${this.unMarkAll.name}`;

        try {
            await this.markedMailsModel.updateMany(
                { email },
                {
                    $pull: { markIds: { $in: markIds } },
                }
            );
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getMailsByMarkId(email: string, markId: string): Promise<MailMessageId[]> {
        const loggerContext = `${MarkedMails.name}/${this.getMailsByMarkId.name}`;

        try {
            const foundMails = await this.markedMailsModel.find({ email, markIds: markId }).lean();

            return foundMails.map((mail) => ({ msgId: mail.msgId, msgSeq: mail.msgSeq }));
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async updateMarkedMailSeq(email: string, msgId: string, msgSeq: number): Promise<void> {
        const loggerContext = `${MarkedMails.name}/${this.getMailsByMarkId.name}`;

        try {
            await this.markedMailsModel.updateOne({ email, msgId }, { $set: { msgSeq } });
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
