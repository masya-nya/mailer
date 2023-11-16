import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Endpoints } from '../consts/endpoints';
import { HttpStatusCode } from 'axios';
import { MarkMailsService } from 'src/marking-mail/mark-mails.service';
import { MarkMailDto } from './dto/mark-mail.dto';

@ApiTags('Связь меток с письмами')
@Controller()
export class MarkMailsController {
    constructor(private readonly markMailsService: MarkMailsService) {}

    @ApiOperation({ summary: 'Пометить письма метками' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Patch(Endpoints.MailService.Mails.MarkMail)
    @HttpCode(HttpStatusCode.Ok)
    public async create(@Body() mailMarkInfo: MarkMailDto): Promise<boolean> {
        await this.markMailsService.markMail(mailMarkInfo);
        return true;
    }

    @ApiOperation({ summary: 'Убрать метки с писем' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Patch(Endpoints.MailService.Mails.UnMarkMail)
    @HttpCode(HttpStatusCode.Ok)
    public async getAll(@Body() mailMarkInfo: MarkMailDto): Promise<boolean> {
        await this.markMailsService.unMarkMail(mailMarkInfo);
        return true;
    }
}
