import { Controller, Get, Query, HttpCode, Delete, Body, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Endpoints } from '../consts/endpoints';
import { HttpStatusCode } from 'axios';
import { MailerService } from './mailer.service';
import { MailerGetAllDto } from './dto/mailer-getAll.dto';
import { MailerRdo } from './mailer.model';
import { MailerDeleteDto } from './dto/mailer-delete.dto';
import { MailerEditAccessDto } from './dto/maielr-editAccess.dto';

@ApiTags('Работа с почтовиками')
@Controller(Endpoints.MailService.Emails)
export class MailerController {
    constructor(private readonly mailerService: MailerService) {}

    @ApiOperation({ summary: 'Получение всех почтовиков пользователя аккаунта и корпоротивных почтовиков' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get()
    @HttpCode(HttpStatusCode.Ok)
    public async getAll(@Query() userInfo: MailerGetAllDto): Promise<MailerRdo[]> {
        const mailers = await this.mailerService.getAll(userInfo);
        return this.mailerService.getMailerArrayRDO(mailers);
    }

    @ApiOperation({ summary: 'Удаление почтовика' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Delete()
    @HttpCode(HttpStatusCode.NoContent)
    public async delete(@Body() userInfo: MailerDeleteDto): Promise<void> {
        await this.mailerService.delete(userInfo);
    }

    @ApiOperation({ summary: 'Изменение доступов к корпоративным почтам' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Patch()
    @HttpCode(HttpStatusCode.Ok)
    public async editCorporateMailAccesses(@Body() userInfo: MailerEditAccessDto): Promise<boolean> {
        return await this.mailerService.editCorporateMailAccesses(userInfo);
    }
}
