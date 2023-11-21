import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PopulationWorkScheduleType, User, UserPopulatedWorkSchedule } from './user.model';
import { Logger } from 'src/core/logger/logger.service';
import { Account } from '../account/account.model';
import { AmoUser } from '../amo-api/types/users.type';
import { UserRoles } from './constants/roles.enum';
import { DEFAULT_AMO_GROUP_NAME } from './constants/default';
import { UpdateUserDTO } from './dto/update-user.dto';
import handleError from 'src/core/helpers/handleError';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly logger: Logger
    ) {
        this.logger.log(`${UserRepository.name} has been initialized`);
    }

    public async createUser(amoUser: AmoUser & { workSchedule: Types.ObjectId }, account: Account): Promise<User> {
        try {
            return await this.userModel.create({
                account: account._id,
                accountId: account.id,
                userName: amoUser.name,
                userId: amoUser.id,
                role: amoUser.rights.is_admin ? UserRoles.Admin : UserRoles.User,
                groupId: amoUser.rights.group_id ? amoUser.rights.group_id : null,
                group: amoUser.rights.group_id ? `group_${amoUser.rights.group_id}` : DEFAULT_AMO_GROUP_NAME,
                isActive: amoUser.rights.is_active,
                workSchedule: amoUser.workSchedule,
            });
        } catch (error) {
            const message = 'Error while creating account user in database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async insertUsers(amoUsers: (AmoUser & { workSchedule: Types.ObjectId })[], account: Account): Promise<void> {
        try {
            const appUsers = amoUsers.map((user) => ({
                account: account._id.toString(),
                accountId: account.id,
                userId: user.id,
                userName: user.name,
                role: user.rights.is_admin ? UserRoles.Admin : UserRoles.User,
                groupId: user.rights.group_id ? user.rights.group_id : null,
                group: user.rights.group_id ? `group_${user.rights.group_id}` : DEFAULT_AMO_GROUP_NAME,
                isActive: user.rights.is_active,
                workSchedule: user.workSchedule,
            }));
            await this.userModel.insertMany(appUsers);
            this.logger.info(`Users for account ${account.id} has been added to database, user counts: ${appUsers.length}`);
        } catch (error) {
            const message = 'Error while insert account users to database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async clearUsersByAccount(account: Account): Promise<void> {
        try {
            await this.userModel
                .deleteMany({ account: account._id })
                .then(() => this.logger.info(`All users for account ${account.id} has been deleted`));
        } catch (error) {
            const message = 'Error while delete account users from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async find(accountId: number): Promise<UserPopulatedWorkSchedule[]> {
        try {
            return await this.userModel.find({ accountId: accountId }).populate<PopulationWorkScheduleType>('workSchedule').exec();
        } catch (error) {
            const message = 'Error while getting users from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async findUserById(accountId: number, userId: number): Promise<User | null> {
        try {
            return await this.userModel.findOne({ accountId: accountId, userId: userId }).exec();
        } catch (error) {
            const message = `Error while getting user ${userId} from database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async updateAllUsers(updateUsers: UpdateUserDTO[], accountId: number): Promise<UserPopulatedWorkSchedule[]> {
        try {
            const updateResultList: UserPopulatedWorkSchedule[] = [];
            for (const user of updateUsers) {
                const updatedUser = await this.updateExactUser(user, accountId);
                updateResultList.push(updatedUser);
            }

            return updateResultList;
        } catch (error) {
            const message = `Error while updating users in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async updateExactUser(updateUser: UpdateUserDTO, accountId: number): Promise<UserPopulatedWorkSchedule> {
        try {
            const foundUser = await this.userModel.findOne({ accountId, userId: updateUser.userId }).lean();

            if (!foundUser) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            return await this.userModel
                .findByIdAndUpdate(
                    foundUser._id,
                    {
                        isInclude: updateUser.isInclude || foundUser.isInclude,
                        status: updateUser.status || foundUser.status,
                        role: updateUser.role || foundUser.role,
                    },
                    { new: true }
                )
                .populate<PopulationWorkScheduleType>('workSchedule')
                .exec();
        } catch (error) {
            const message = `Error while updating user ${updateUser.userId} in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async updateUserWorkSchedule(accountId: number, userId: number, workSchedule: Types.ObjectId): Promise<void> {
        try {
            await this.userModel.updateOne({ accountId, userId }, { workSchedule });
        } catch (error) {
            const message = `Error while updating user ${userId} in database`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }
}
