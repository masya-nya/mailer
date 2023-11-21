import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import handleError from 'src/core/helpers/handleError';
import { Logger } from 'src/core/logger/logger.service';
import { AccountRepository } from '../account/account.repository';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';
import { WorkScheduleDocument } from './work-schedule.model';
import { WorkScheduleRepository } from './work-schedule.repository';
import { UserRepository } from './../users/user.repository';

@Injectable()
export class WorkScheduleService {
    constructor(
        private readonly workScheduleRepository: WorkScheduleRepository,
        private readonly accountRepository: AccountRepository,
        private readonly userRepository: UserRepository,
        private readonly logger: Logger
    ) {
        this.logger.log(`${WorkScheduleService.name} has been initialized`);
    }

    async createWorkSchedule(accountId: number, workScheduleDto: CreateWorkScheduleDto): Promise<WorkScheduleDocument> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            const workSchedule = await this.workScheduleRepository.createWorkSchedule(account._id, workScheduleDto);

            if (workSchedule.user !== -1) {
                await this.userRepository.updateUserWorkSchedule(accountId, workSchedule.user, workSchedule._id);
            }

            return workSchedule;
        } catch (error) {
            const message = `Error while creating distribution template`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async getAccountWorkSchedules(accountId: number): Promise<WorkScheduleDocument[]> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            return await this.workScheduleRepository.getAccountWorkSchedules(account._id);
        } catch (error) {
            const message = `Error while creating distribution template`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async getUserWorkSchedules(accountId: number, userId: number): Promise<WorkScheduleDocument> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            return await this.workScheduleRepository.getUserWorkSchedules(account._id, userId);
        } catch (error) {
            const message = `Error while creating distribution template`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }

    async updateWorkSchedule(accountId: number, workSchedule: UpdateWorkScheduleDto): Promise<WorkScheduleDocument> {
        try {
            const account = await this.accountRepository.getAccountById(accountId);

            if (!account) {
                throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
            }

            return await this.workScheduleRepository.updateWorkSchedule(account._id, workSchedule);
        } catch (error) {
            const message = `Error while creating distribution template`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }
}
