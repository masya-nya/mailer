import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import { Mailer, MailerDocument, UserMailers } from './mailer.model';
import handleError from './../utils/handleError';
import { MailerEditDto } from './dto/mailer-edit.dto';
import { MailMarkService } from '../mail-mark/mail-mark.service';
import { MailerEditAccessDto } from './dto/maielr-editAccess.dto';

@Injectable()
export class MailerRepository {
    constructor(
        @InjectModel(UserMailers.name)
        private readonly mailerModel: Model<UserMailers>,
        private readonly mailMarkService: MailMarkService,
        private readonly logger: MarlboroService
    ) {}

    public async createMailer(accountId: number, managerId: number, mailer: Mailer): Promise<boolean> {
        const loggerContext = `${UserMailers.name}/${this.createMailer.name}`;

        try {
            const isMailerExist = await this.mailerModel.findOne({ 'mailers.email': mailer.email }).lean();
            const userMailers = await this.mailerModel.findOne({ accountId, managerId }).lean();

            if (isMailerExist) {
                const [foundMailer] = isMailerExist.mailers.filter(({ email }) => email === mailer.email);

                await this.mailerModel.updateOne(
                    { accountId: isMailerExist.accountId, managerId: isMailerExist.managerId },
                    {
                        'mailers.$[mailer].email': mailer.email || foundMailer.email,
                        'mailers.$[mailer].mailUserId': mailer.mailUserId || foundMailer.mailUserId,
                        'mailers.$[mailer].photo': mailer.photo || foundMailer.photo,
                        'mailers.$[mailer].accessToken': mailer.accessToken || foundMailer.accessToken,
                        'mailers.$[mailer].refreshToken': mailer.refreshToken || foundMailer.refreshToken,
                        'mailers.$[mailer].allowedManagers': mailer.unallowedManagers || foundMailer.unallowedManagers,
                    },
                    {
                        arrayFilters: [{ 'mailer.email': mailer.email }],
                    }
                );

                return !userMailers || (userMailers && userMailers._id !== isMailerExist._id);
            }

            if (!userMailers) {
                await this.mailerModel.create({ accountId, managerId, mailers: [mailer] });
            } else {
                await this.mailerModel.updateOne({ accountId, managerId }, { $push: { mailers: mailer } });
            }

            await this.mailMarkService.initAccount(mailer.email);

            return true;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getByEmail(accountId: number, managerId: number, email: string): Promise<MailerDocument | null> {
        const loggerContext = `${UserMailers.name}/${this.getByEmail.name}`;

        try {
            const userMailers = await this.mailerModel.findOne({ accountId, managerId }).lean();

            if (!userMailers) {
                throw new HttpException('No user with this accountId and managerId', HttpStatus.NOT_FOUND);
            }

            return userMailers.mailers.find((mailer) => mailer.email === email) || null;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getMailers(accountId: number, managerId: number): Promise<MailerDocument[]> {
        const loggerContext = `${UserMailers.name}/${this.getMailers.name}`;

        try {
            const userMailers = await this.mailerModel.findOne({ accountId, managerId }).lean();

            return userMailers?.mailers || [];
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async delete(accountId: number, managerId: number, email: string): Promise<void> {
        const loggerContext = `${UserMailers.name}/${this.delete.name}`;

        try {
            const userMailers = await this.mailerModel.findOne({ accountId, managerId }).lean();

            if (!userMailers) {
                throw new HttpException('No user with this accountId and managerId', HttpStatus.NOT_FOUND);
            }

            await this.mailerModel.updateOne(
                { accountId, managerId },
                {
                    $pull: { mailers: { email } },
                }
            );
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async edit(accountId: number, managerId: number, mailer: MailerEditDto): Promise<MailerDocument> {
        const loggerContext = `${UserMailers.name}/${this.edit.name}`;

        try {
            const userMailers = await this.mailerModel.findOne({ accountId, managerId }).lean();

            if (!userMailers) {
                throw new HttpException('No user with this accountId and managerId', HttpStatus.NOT_FOUND);
            }

            const isExistedMailer = userMailers.mailers.find(({ email }) => email === mailer.email);
            if (!isExistedMailer) {
                throw new HttpException('This email does not exist in this accountId and managerId', HttpStatus.NOT_FOUND);
            }
            const [updatedMailers] = (
                await this.mailerModel
                    .findOneAndUpdate(
                        { accountId, managerId },
                        {
                            $set: { ['mailers.$[mailer]']: { ...isExistedMailer, ...mailer } },
                        },
                        {
                            arrayFilters: [{ 'mailer.email': mailer.email }],
                            new: true,
                        }
                    )
                    .lean()
            ).mailers.filter((mail) => mail.email === mailer.email);
            return updatedMailers;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getAllUsers(): Promise<UserMailers[]> {
        const loggerContext = `${UserMailers.name}/${this.getAllUsers.name}`;

        try {
            const foundUsers = await this.mailerModel.find().lean();

            return foundUsers || [];
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async editCorporateMailAccesses({ accountId, emails }: MailerEditAccessDto): Promise<void> {
        const loggerContext = `${UserMailers.name}/${this.editCorporateMailAccesses.name}`;

        try {
            for (const email of emails) {
                await this.mailerModel.updateOne(
                    { accountId, managerId: -1 },
                    {
                        'mailers.$[mailer].unallowedManagers': email.unallowedManagers,
                    },
                    {
                        arrayFilters: [{ 'mailer.email': email.email }],
                    }
                );
            }
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
