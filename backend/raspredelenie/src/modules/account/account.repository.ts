import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './account.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '../../core/logger/logger.service';
import { AppAccount } from './types/account.type';
import handleError from 'src/core/helpers/handleError';

@Injectable()
export class AccountRepository {
    constructor(
        @InjectModel(Account.name) private readonly accountModel: Model<Account>,
        private readonly logger: Logger
    ) {}

    public async getAllAccounts(): Promise<AccountDocument[]> {
        const loggerContext = `${Account.name}/${this.getAccountById.name}`;

        try {
            return await this.accountModel.find({});
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async getAccountById(accountId: number): Promise<AccountDocument> {
        const loggerContext = `${Account.name}/${this.getAccountById.name}`;

        try {
            return await this.accountModel.findOne({ id: accountId });
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async createAccount(account: AppAccount): Promise<AccountDocument> {
        const loggerContext = `${Account.name}/${this.createAccount.name}`;

        try {
            const createdAccount = await this.accountModel.create(account);
            return createdAccount;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async saveAccountDocument(account: AccountDocument): Promise<AccountDocument> {
        const loggerContext = `${Account.name}/${this.saveAccountDocument.name}`;

        try {
            return await account.save();
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
