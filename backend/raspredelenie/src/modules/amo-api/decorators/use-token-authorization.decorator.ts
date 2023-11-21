import axios from 'axios';
import { AxiosError, HttpStatusCode } from 'axios';
import * as mongoose from 'mongoose';
import { Account, AccountSchema } from '../../account/account.model';
import { AccountRepository } from '../../account/account.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { setTimeout as sleep } from 'node:timers/promises';
import { Logger } from '../../../core/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfigSchema } from 'src/core/config/app.schema';
import { TokensResponse } from '../types/amo-api.types';
import { AuthQueryDto } from '../dto/auth-query.dto';
import * as path from 'path';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(__dirname, '..', '..', '..', '..', `.${process.env.NODE_ENV}.env`),
});

mongoose
    .connect(process.env.MONGO_CONNECT, {
        dbName: process.env.MONGO_NAME,
    })
    .then();

const accountModel = mongoose.model<Account>(Account.name, AccountSchema);

const ONE_SECOND_IN_MILLISECONDS = 1000;

async function refreshAccessToken(refreshToken: string, accountId: number, subdomain: string): Promise<string> {
    const config = new ConfigService<ApplicationConfigSchema>();
    const logger = new Logger();
    return axios
        .post<TokensResponse>(`https://${subdomain}.amocrm.ru/oauth2/access_token`, {
            client_id: config.get('CLIENT_UUID'),
            client_secret: config.get('CLIENT_SECRET'),
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            redirect_uri: config.get('REDIRECT_URI'),
        })
        .then(async (res) => {
            logger.warn('Token updated successfully');
            const token = res.data;
            await accountModel.findOneAndUpdate({ id: accountId }, { refreshToken: token.refresh_token, accessToken: token.access_token });
            return token.access_token;
        })
        .catch((err) => {
            logger.error('Failed to refresh token');
            logger.error(err);
            logger.error(err.response);
            logger.error(err.response.data);
            return '';
        });
}

export function UseTokenAuthorization(maxRetries = 5) {
    return function (_target: object, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;

        const logger = new Logger();
        const accountRepository = new AccountRepository(accountModel, logger);

        const loggerContext = `${UseTokenAuthorization.name}/${originalMethod.name}`;

        descriptor.value = async function <T>(authDto: AuthQueryDto, ...args: unknown[]): Promise<T> {
            let currentTry = 1;

            while (currentTry <= maxRetries) {
                try {
                    return await originalMethod.apply(this, [authDto, ...args]);
                } catch (error) {
                    console.log(error);
                    const accountInfo = await accountRepository.getAccountById(authDto.accountId);

                    const errorStatus = (error as AxiosError).response?.status;

                    switch (errorStatus) {
                        case HttpStatusCode.Unauthorized: {
                            if (currentTry <= maxRetries) {
                                logger.warn(
                                    `${error.message} \n Try to update the tokens and send the request again \n Attempt: ${currentTry}`,
                                    loggerContext,
                                    authDto.subdomain
                                );

                                const updatedToken = await refreshAccessToken(accountInfo.refreshToken, accountInfo.id, authDto.subdomain);
                                authDto.token = updatedToken;

                                currentTry++;
                            } else {
                                logger.error('Reached maximum retry count. Could not refresh tokens.', loggerContext, authDto.subdomain);

                                throw new HttpException(error.response.data, HttpStatus.UNAUTHORIZED);
                            }
                            break;
                        }
                        case HttpStatusCode.BadRequest:
                        case HttpStatusCode.NotFound: {
                            if (currentTry <= maxRetries) {
                                logger.warn(
                                    `${error.message} \n Try to send the request again \n Attempt: ${currentTry}`,
                                    loggerContext,
                                    authDto.subdomain
                                );
                                currentTry++;
                            } else {
                                logger.error('Reached maximum retry count. Could not refresh tokens.', loggerContext, authDto.subdomain);

                                throw new HttpException(
                                    error.response.data,
                                    errorStatus === HttpStatusCode.NotFound ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST
                                );
                            }
                            break;
                        }
                        case HttpStatusCode.TooManyRequests: {
                            if (currentTry <= maxRetries) {
                                logger.warn(
                                    `${error.message} \n Try to send the request again \n Attempt: ${currentTry}`,
                                    loggerContext,
                                    authDto.subdomain
                                );
                                await sleep(ONE_SECOND_IN_MILLISECONDS);
                                currentTry++;
                            } else {
                                logger.error('Reached maximum retry count. Could not refresh tokens.', loggerContext, authDto.subdomain);

                                throw new HttpException(error.response.data, HttpStatus.TOO_MANY_REQUESTS);
                            }
                            break;
                        }
                        default: {
                            if (currentTry <= maxRetries) {
                                logger.warn(
                                    `${error.message} \n Try to send the request again \n Attempt: ${currentTry}`,
                                    loggerContext,
                                    authDto.subdomain
                                );
                                currentTry++;
                            } else {
                                logger.error(error.message, loggerContext, authDto.subdomain);

                                throw new HttpException(error.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
                            }
                        }
                    }
                }
            }
        };

        return descriptor;
    };
}
