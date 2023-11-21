import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from 'src/core/logger/logger.service';
import { AccountRepository } from '../account/account.repository';
import { AmoApiService } from '../amo-api/amo-api.service';
import { User, UserPopulatedWorkSchedule } from './user.model';
import { UserRepository } from './user.repository';
import { UserRoles } from './constants/roles.enum';
import { DEFAULT_AMO_GROUP_NAME } from './constants/default';
import { UpdateUserDTO } from './dto/update-user.dto';
import handleError from 'src/core/helpers/handleError';
import { WorkScheduleRepository } from 'src/modules/work-schedule/work-schedule.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly accountRepository: AccountRepository,
        private readonly amoApiService: AmoApiService,
        private readonly workScheduleRepository: WorkScheduleRepository,
        private readonly logger: Logger
    ) {
        this.logger.log(`${UserService.name} has been initialized`);
    }

    private validateUsersAccount(updatedUser: UpdateUserDTO[], accountId: number): boolean {
        return updatedUser.some((user) => user.accountId === accountId);
    }

    public async getUser(accountId: number, subdomain: string, userId: number): Promise<User> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException(`Account not found`, HttpStatus.NOT_FOUND);
            }

            const apiUser = await this.amoApiService.getUser({ accountId, subdomain }, userId);

            if (!apiUser) {
                throw new HttpException(`User with id: ${userId} unexist in account: ${accountId}`, HttpStatus.NOT_FOUND);
            }

            const appUser = await this.userRepository.findUserById(accountId, userId);

            if (!appUser) {
                const account = await this.accountRepository.getAccountById(accountId);
                if (!account) {
                    throw new HttpException(
                        `Account: ${accountId} unexist in widget, please contact with reon support info@reon.pro`,
                        HttpStatus.NOT_FOUND
                    );
                }

                const workSchedule = await this.workScheduleRepository.getOfficeWorkSchedule(account._id);
                return await this.userRepository.createUser({ ...apiUser, workSchedule: workSchedule._id }, account);
            }

            const apiUserRole = apiUser.rights.is_admin ? UserRoles.Admin : UserRoles.User;
            const isSameRole = apiUserRole === appUser.role;
            const isSameName = apiUser.name === appUser.userName;
            const amoStatusUser = apiUser.rights.is_active === appUser.isActive;
            const isSameGroupId = apiUser.rights.group_id === appUser.groupId;

            if (!isSameName || !isSameRole || !amoStatusUser || !isSameGroupId) {
                appUser.role = apiUserRole;
                appUser.userName = apiUser.name;
                appUser.isActive = apiUser.rights.is_active;
                appUser.groupId = apiUser.rights.group_id;
                appUser.group = apiUser.rights.group_id ? `group_${apiUser.rights.group_id}` : DEFAULT_AMO_GROUP_NAME;
                await this.userRepository.updateExactUser(appUser, accountId);
            }

            return appUser;
        } catch (error) {
            const message = `Error while getting user from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async getAccountUsers(accountId: number, subdomain: string): Promise<UserPopulatedWorkSchedule[]> {
        try {
            const apiUsers = await this.amoApiService.getAccountUsers({ accountId, subdomain });

            if (!apiUsers || !apiUsers.length) {
                throw new HttpException(`Users list for account: ${accountId} is empty`, HttpStatus.NOT_FOUND);
            }

            const appUsers = await this.userRepository.find(accountId);

            const account = await this.accountRepository.getAccountById(accountId);

            if (apiUsers.length !== appUsers.length) {
                const createdUsers = apiUsers.filter((user) => !appUsers.some((appUser) => appUser.userId === user.id));

                const workSchedule = await this.workScheduleRepository.getOfficeWorkSchedule(account._id);
                const treatedUsers = createdUsers.map((user) => ({
                    workSchedule: workSchedule._id,
                    ...user,
                }));
                await this.userRepository.insertUsers(treatedUsers, account);
            }

            const updatedUsers = appUsers
                .filter((appUser) => {
                    const targetUser = apiUsers.find((user) => user.id === appUser.userId);

                    const apiUserRole = targetUser.rights.is_admin ? UserRoles.Admin : UserRoles.User;
                    const isSameRole = apiUserRole === appUser.role;
                    const isSameName = targetUser.name === appUser.userName;
                    const amoStatusUser = targetUser.rights.is_active === appUser.isActive;
                    const isSameGroupId = targetUser.rights.group_id === appUser.groupId;

                    if (!isSameName || !isSameRole || !amoStatusUser || !isSameGroupId) {
                        return true;
                    }
                })
                .map((appUser) => {
                    const targetUser = apiUsers.find((user) => user.id === appUser.userId);
                    appUser.role = targetUser.rights.is_admin ? UserRoles.Admin : UserRoles.User;
                    appUser.userName = targetUser.name;
                    appUser.isActive = targetUser.rights.is_active;
                    appUser.groupId = targetUser.rights.group_id;
                    appUser.group = targetUser.rights.group_id ? `group_${targetUser.rights.group_id}` : DEFAULT_AMO_GROUP_NAME;
                    return appUser;
                });
            await this.userRepository.updateAllUsers(updatedUsers, accountId);
            return await this.userRepository.find(accountId);
        } catch (error) {
            const message = `Error while getting users`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async updateUsers(updatedUsers: UpdateUserDTO[], accountId: number): Promise<UserPopulatedWorkSchedule[]> {
        try {
            const isCorrectAccounts = this.validateUsersAccount(updatedUsers, accountId);

            if (!isCorrectAccounts) {
                throw new HttpException('Some users have incorrect account id field value', HttpStatus.BAD_REQUEST);
            }

            const users = await this.userRepository.updateAllUsers(updatedUsers, accountId);

            return users;
        } catch (error) {
            const message = `Error while updating users in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }
}
