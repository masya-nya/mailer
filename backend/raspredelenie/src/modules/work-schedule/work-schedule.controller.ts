import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Endpoints } from 'src/core/constants/endpoints';
import { fillDTO } from 'src/core/helpers/fill-dto';
import { Logger } from 'src/core/logger/logger.service';
import { QueryAccountIdDto } from 'src/core/types/query-accountId.dto';
import { CreateWorkScheduleDto } from './dto/create-work-schedule.dto';
import { ExactWorkScheduleRdo } from './rdo/exact-work-schedule.rdo';
import { WorkScheduleService } from './work-schedule.service';
import { UpdateWorkScheduleDto } from './dto/update-work-schedule.dto';

@ApiTags('Work schedule')
@Controller(Endpoints.WorkSchedules.Base)
export class WorkScheduleController {
    constructor(
        private readonly workScheduleService: WorkScheduleService,
        private readonly logger: Logger
    ) {
        this.logger.log(`${WorkScheduleController.name} has been initialized`);
    }

    @ApiOperation({ summary: 'Создать график работы' })
    @ApiCreatedResponse({ type: ExactWorkScheduleRdo })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    public async createWorkSchedule(
        @Query() { accountId }: QueryAccountIdDto,
        @Body() scheduleDto: CreateWorkScheduleDto
    ): Promise<ExactWorkScheduleRdo> {
        const schedule = await this.workScheduleService.createWorkSchedule(accountId, scheduleDto);
        return fillDTO(ExactWorkScheduleRdo, schedule);
    }

    @ApiOperation({ summary: 'Получить графики работы аккаунта' })
    @ApiOkResponse({ type: ExactWorkScheduleRdo })
    @HttpCode(HttpStatus.OK)
    @Get()
    public async getAccountWorkSchedules(@Query() { accountId }: QueryAccountIdDto): Promise<ExactWorkScheduleRdo[]> {
        const schedules = await this.workScheduleService.getAccountWorkSchedules(accountId);
        return schedules.map((schedule) => fillDTO(ExactWorkScheduleRdo, schedule));
    }

    @ApiOperation({ summary: 'Получить графики работы пользователя' })
    @ApiParam({ name: 'userId', description: 'User amo id', example: 233457 })
    @ApiOkResponse({ type: ExactWorkScheduleRdo })
    @HttpCode(HttpStatus.OK)
    @Get('/:userId')
    public async getUserWorkSchedule(
        @Query() { accountId }: QueryAccountIdDto,
        @Param('userId') userId: number
    ): Promise<ExactWorkScheduleRdo> {
        const schedule = await this.workScheduleService.getUserWorkSchedules(accountId, userId);
        return fillDTO(ExactWorkScheduleRdo, schedule);
    }

    @ApiOperation({ summary: 'Изменить рабочий график пользователя' })
    @ApiOkResponse({ type: ExactWorkScheduleRdo })
    @HttpCode(HttpStatus.OK)
    @Patch()
    public async updateWorkSchedules(
        @Query() { accountId }: QueryAccountIdDto,
        @Body() updateDto: UpdateWorkScheduleDto
    ): Promise<ExactWorkScheduleRdo> {
        const schedule = await this.workScheduleService.updateWorkSchedule(accountId, updateDto);
        return fillDTO(ExactWorkScheduleRdo, schedule);
    }
}
