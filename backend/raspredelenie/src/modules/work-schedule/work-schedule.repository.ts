import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkSchedule, WorkScheduleDocument } from './work-schedule.model';
import { Model, Types } from 'mongoose';
import { Logger } from 'src/core/logger/logger.service';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import handleError from 'src/core/helpers/handleError';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';
import { DefaultWorkSchedule } from 'src/modules/work-schedule/constants/default-work-schedule';

@Injectable()
export class WorkScheduleRepository {
    constructor(
        @InjectModel(WorkSchedule.name) private readonly workScheduleModel: Model<WorkSchedule>,
        private readonly logger: Logger
    ) {
        this.logger.log(`${WorkScheduleRepository.name} has been initialized`);
    }

    async createWorkSchedule(accountMongoId: Types.ObjectId, workSchedule: CreateWorkScheduleDto): Promise<WorkScheduleDocument> {
        try {
            const foundUserSchedule = await this.workScheduleModel.findOne({ account: accountMongoId, user: workSchedule.user });

            if (!foundUserSchedule) {
                throw new HttpException('User already have work schedule', HttpStatus.BAD_REQUEST);
            }

            const createdTemplate = await this.workScheduleModel.create({
                account: new Types.ObjectId(accountMongoId),
                ...workSchedule,
            });

            return createdTemplate;
        } catch (error) {
            const message = 'Error while creating work schedule from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async createOfficeWorkSchedule(accountMongoId: Types.ObjectId): Promise<WorkScheduleDocument> {
        try {
            const foundUserSchedule = await this.workScheduleModel.findOne({ account: accountMongoId, user: -1 });

            if (!foundUserSchedule) {
                throw new HttpException('Account already have office work schedule', HttpStatus.BAD_REQUEST);
            }

            const createdTemplate = await this.workScheduleModel.create({
                account: new Types.ObjectId(accountMongoId),
                user: -1,
                ...DefaultWorkSchedule,
            });

            return createdTemplate;
        } catch (error) {
            const message = 'Error while creating office work schedule from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async getOfficeWorkSchedule(accountMongoId: Types.ObjectId): Promise<WorkScheduleDocument> {
        try {
            const workSchedule = await this.workScheduleModel.findOne({ account: accountMongoId, user: -1 });

            if (!workSchedule) {
                throw new HttpException('Office work schedule not found', HttpStatus.NOT_FOUND);
            }

            return workSchedule;
        } catch (error) {
            const message = 'Error while getting office work schedule from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async createBulkWorkSchedules(accountMongoId: Types.ObjectId, workSchedules: CreateWorkScheduleDto[]): Promise<WorkScheduleDocument[]> {
        try {
            const treatedUserIds = workSchedules.map((workSchedule) => workSchedule.user);
            const foundUserSchedules = await this.workScheduleModel.find({ account: accountMongoId, user: { $in: treatedUserIds } });

            const treatedSchedules = workSchedules.filter((workSchedule) => {
                return !foundUserSchedules.some((userSchedule) => userSchedule.user === workSchedule.user);
            });

            const schedulesDto = treatedSchedules.map((workSchedule) => ({ ...workSchedule, account: new Types.ObjectId(accountMongoId) }));
            const createdTemplates = await this.workScheduleModel.insertMany(schedulesDto);

            return createdTemplates;
        } catch (error) {
            const message = 'Error while creating work schedule from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async getWorkSchedule(workScheduleId: Types.ObjectId): Promise<WorkScheduleDocument> {
        try {
            const foundSchedule = await this.workScheduleModel.findById(workScheduleId);

            if (!foundSchedule) {
                throw new HttpException('Work schedule not found', HttpStatus.NOT_FOUND);
            }

            return foundSchedule;
        } catch (error) {
            const message = 'Error while getting work schedule by id from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async getUserWorkSchedules(accountMongoId: Types.ObjectId, userId: number): Promise<WorkScheduleDocument> {
        try {
            const foundSchedule = await this.workScheduleModel.findOne({
                account: accountMongoId,
                user: userId,
            });

            if (!foundSchedule) {
                throw new HttpException('Work schedule not found', HttpStatus.NOT_FOUND);
            }

            return foundSchedule;
        } catch (error) {
            const message = 'Error while getting user work schedule from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async getAccountWorkSchedules(accountMongoId: Types.ObjectId): Promise<WorkScheduleDocument[]> {
        try {
            const foundSchedules = await this.workScheduleModel.find({
                account: accountMongoId,
            });

            return foundSchedules;
        } catch (error) {
            const message = 'Error while getting account work schedules from database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async updateWorkSchedule(accountMongoId: Types.ObjectId, updateScheduleDto: UpdateWorkScheduleDto): Promise<WorkScheduleDocument> {
        try {
            const foundSchedule = await this.workScheduleModel.findOne({ _id: updateScheduleDto.id, account: accountMongoId });

            if (!foundSchedule) {
                throw new HttpException('Work Schedule not found', HttpStatus.NOT_FOUND);
            }

            const updatedSchedule = await this.workScheduleModel
                .findOneAndUpdate({ _id: foundSchedule._id }, updateScheduleDto, { new: true })
                .exec();

            return updatedSchedule;
        } catch (error) {
            const message = 'Error while updating account work schedule in database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async deleteWorkSchedule(accountMongoId: Types.ObjectId, schedules: string[]): Promise<void> {
        try {
            await this.workScheduleModel.deleteMany({ account: accountMongoId, _id: { $in: schedules } });
        } catch (error) {
            const message = 'Error while deleting work schedules in database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async deleteUserWorkSchedules(userId: number): Promise<void> {
        try {
            await this.workScheduleModel.deleteMany({ user: userId });
        } catch (error) {
            const message = 'Error while deleting user work schedules in database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    public async deleteAccountWorkSchedule(accountMongoId: Types.ObjectId): Promise<void> {
        try {
            await this.workScheduleModel.deleteMany({ account: accountMongoId });
        } catch (error) {
            const message = 'Error while deleting account work schedules in database';
            this.logger.error(message, error);
            handleError(error, message);
        }
    }
}
