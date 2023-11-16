import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './account.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarlboroService } from '../marlboroLogger/marlboro.service';

@Injectable()
export class AccountRepository {
    constructor(@InjectModel(Account.name) private readonly accountModel: Model<Account>, private readonly logger: MarlboroService) {}

    public async getAccountById(accountId: number): Promise<AccountDocument> {
        const loggerContext = `${Account.name}/${this.getAccountById.name}`;

        try {
            return await this.accountModel.findOne({ id: accountId });
        } catch (error) {
            this.logger.error(error, loggerContext);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async createAccount(accountInfo: Account): Promise<AccountDocument> {
        const loggerContext = `${Account.name}/${this.createAccount.name}`;

        try {
            const newAccount = new this.accountModel(accountInfo);

            return await newAccount.save();
        } catch (error) {
            this.logger.error(error, loggerContext);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async updateAccountByID(accountInfo: AccountDocument): Promise<AccountDocument> {
        const loggerContext = `${Account.name}/${this.updateAccountByID.name}`;

        try {
            return await accountInfo.save();
        } catch (error) {
            this.logger.error(error, loggerContext);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getAllAccounts(): Promise<Account[]> {
        const loggerContext = `${Account.name}/${this.getAllAccounts.name}`;

        try {
            return await this.accountModel.find().lean();
        } catch (error) {
            this.logger.error(error, loggerContext);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async updateTokensByAccountId(accountId: number, accessToken: string, refreshToken: string): Promise<void> {
        const loggerContext = `${Account.name}/${this.updateTokensByAccountId.name}`;

        try {
            await this.accountModel.updateOne(
                { id: accountId },
                {
                    $set: {
                        accessToken,
                        refreshToken,
                    },
                }
            );
        } catch (error) {
            this.logger.error(error, loggerContext);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
