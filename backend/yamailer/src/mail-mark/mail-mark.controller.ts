import { Body, Controller, Delete, Get, Post, Query, Put, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Endpoints } from '../consts/endpoints';
import { HttpStatusCode } from 'axios';
import { MailMarkService } from './mail-mark.service';
import { MailMarkCreateDto } from './dto/mail-mark-create.dto';
import { MailMarkGetAllDto } from './dto/mail-mark-getAll.dto';
import { MailMarkDeleteDto } from './dto/mail-mark-delete.dto';
import { MailMarkEditDto } from './dto/mail-mark-edit.dto';
import { MailMarkDocument } from './mail-mark.model';

@ApiTags('Работа с метками писем')
@Controller()
export class MailMarkController {
    constructor(private readonly mailMarkService: MailMarkService) {}

    @ApiOperation({ summary: 'Создание метки' })
    @ApiResponse({ status: HttpStatusCode.Created })
    @Post(Endpoints.MailService.Mark)
    @HttpCode(HttpStatusCode.Created)
    public async create(@Body() userMark: MailMarkCreateDto): Promise<MailMarkDocument> {
        return await this.mailMarkService.create(userMark);
    }

    @ApiOperation({ summary: 'Получение всех меток пользователя' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(Endpoints.MailService.Mark)
    @HttpCode(HttpStatusCode.Ok)
    public async getAll(@Query() userInfo: MailMarkGetAllDto): Promise<MailMarkDocument[]> {
        return await this.mailMarkService.getAll(userInfo);
    }

    @ApiOperation({ summary: 'Удаление метки' })
    @ApiResponse({ status: HttpStatusCode.NoContent })
    @Delete(Endpoints.MailService.Mark)
    @HttpCode(HttpStatusCode.NoContent)
    public async deleteMark(@Body() markInfo: MailMarkDeleteDto): Promise<void> {
        return await this.mailMarkService.delete(markInfo);
    }

    @ApiOperation({ summary: 'Редактирование метки пользователя' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Put(Endpoints.MailService.Mark)
    @HttpCode(HttpStatusCode.Ok)
    public async edit(@Body() markInfo: MailMarkEditDto): Promise<MailMarkDocument> {
        return await this.mailMarkService.edit(markInfo);
    }
}
