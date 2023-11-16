import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { AmoApiService } from './amo-api.service';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import * as mongoose from 'mongoose';
import { Account, AccountSchema } from '../account/account.model';
import * as process from 'process';
import { AccountRepository } from '../account/account.repository';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AuthQueryDto } from './dto/auth-query.dto';
import { ConfigService } from '@nestjs/config';
import { AppConfigSchema } from 'src/app.schema';

dotenv.config({
    path: path.resolve(__dirname, '..', '..', `.${process.env.NODE_ENV}.env`),
});

mongoose
    .connect(process.env.MONGO_CONNECT, {
        dbName: process.env.MONGO_NAME,
    })
    .then();

const accountModel = mongoose.model<Account>(Account.name, AccountSchema);

export function UseTokenAuthorization(maxRetries = 5) {
    return function (target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;

        const logger = new MarlboroService();
        const accountRepository = new AccountRepository(accountModel, logger);
        const config = new ConfigService<AppConfigSchema>();
        const amoApiService = new AmoApiService(accountRepository, config, logger);

        const loggerContext = `${UseTokenAuthorization.name}/${originalMethod.name}`;

        descriptor.value = async function (authDto: AuthQueryDto, ...args: unknown[]): Promise<AxiosResponse | AxiosError> {
            let retries = 1;

            while (true) {
                try {
                    return await originalMethod.apply(this, [authDto, ...args]);
                } catch (error) {
                    const accountInfo = await accountRepository.getAccountById(authDto.accountId);

                    switch ((error as AxiosError).response?.status) {
                        case HttpStatusCode.Unauthorized:
                        case HttpStatusCode.TooManyRequests:
                        case HttpStatusCode.BadRequest:
                        case HttpStatusCode.NotFound: {
                            if (retries <= maxRetries) {
                                logger.warn(
                                    `${error.message} \n Try to update the tokens and send the request again \n Attempt: ${retries}`,
                                    loggerContext,
                                    accountInfo.subdomain
                                );

                                const tokensData = await amoApiService.refreshAccessToken(accountInfo.subdomain, accountInfo.refreshToken);

                                accountInfo.accessToken = tokensData.access_token;
                                accountInfo.refreshToken = tokensData.refresh_token;

                                await accountRepository.updateAccountByID(accountInfo);

                                authDto.token = tokensData.access_token;

                                retries++;
                            } else {
                                logger.error(
                                    'Reached maximum retry count. Could not refresh tokens.',
                                    loggerContext,
                                    accountInfo.subdomain
                                );

                                return error.response.data;
                            }
                            break;
                        }
                        default: {
                            logger.error(error.message, loggerContext, accountInfo.subdomain);
                            throw error;
                        }
                    }
                }
            }
        };

        return descriptor;
    };
}
