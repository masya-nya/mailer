import {
    Controller,
    Get,
    Query,
    HttpCode,
    Param,
    Body,
    Patch,
    Post,
    UseInterceptors,
    UploadedFiles,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Endpoints } from '../consts/endpoints';
import { HttpStatusCode } from 'axios';
import { MailsService } from './mails.service';
import { MailsGetMessageDto } from './dto/mails-getMessage.dto';
import { GetMailRDO, GetMailsPageRDO, MailCountInBoxesRdo } from './types/mails.rdo';
import { MailsSetFlagDto } from './dto/mails-setFlag.dto';
import { MailsGetDto } from './dto/mails-getCounts.dto';
import { MailsGetDatePagesDto } from './dto/mails-getDatePage.dto';
import { MailsMoveMessageDto } from './dto/mails-moveMessage.dto';
import { MailsSendMessageDto } from './dto/mail-sendMessage.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import validateFilesMaxSize from 'src/utils/validatefilesMaxSize';

@ApiTags('Работа с письмами')
@Controller(Endpoints.MailService.Mails.Root)
export class MailsController {
    constructor(private readonly mailsService: MailsService) {}

    @ApiOperation({ summary: 'Отправка письма' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Post()
    @HttpCode(HttpStatusCode.Ok)
    @UseInterceptors(FilesInterceptor('files'))
    public async sendMail(@Body() mailerInfo: MailsSendMessageDto, @UploadedFiles() files: Express.Multer.File[]): Promise<boolean> {
        if (files && !validateFilesMaxSize(files)) {
            throw new HttpException('Размер файлов больше 20МБ', HttpStatus.PAYLOAD_TOO_LARGE);
        }
        return await this.mailsService.sendMail(mailerInfo, files);
    }

    @ApiOperation({ summary: 'Получение писем в диапозоне даты' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get()
    @HttpCode(HttpStatusCode.Ok)
    public async getPageByDateAndQuery(@Query() mailerInfo: MailsGetDatePagesDto): Promise<GetMailsPageRDO> {
        return await this.mailsService.getPageByDateAndQuery(mailerInfo);
    }

    @ApiOperation({ summary: 'Получение коллиества сообщений в разделах почты' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(Endpoints.MailService.Mails.MailCountInBoxes)
    @HttpCode(HttpStatusCode.Ok)
    public async getMailCountInBoxes(@Query() mailerInfo: MailsGetDto): Promise<MailCountInBoxesRdo> {
        return await this.mailsService.getMailCountInBoxes(mailerInfo);
    }

    @ApiOperation({ summary: 'Получение колличества непрочитанных' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(Endpoints.MailService.Mails.UnseenCount)
    @HttpCode(HttpStatusCode.Ok)
    public async getUnseenCount(@Query() mailerInfo: MailsGetDto): Promise<number> {
        return await this.mailsService.getUnseenCount(mailerInfo);
    }

    @ApiOperation({ summary: 'Получение колличества важных' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(Endpoints.MailService.Mails.ImportantCount)
    @HttpCode(HttpStatusCode.Ok)
    public async getImportantCount(@Query() mailerInfo: MailsGetDto): Promise<number> {
        return await this.mailsService.getImportantCount(mailerInfo);
    }

    @ApiOperation({ summary: 'Перемещение сообщения в папку/раздел' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Patch(Endpoints.MailService.Mails.MoveToFolder)
    @HttpCode(HttpStatusCode.Ok)
    public async mailMove(@Body() mailerInfo: MailsMoveMessageDto): Promise<boolean> {
        return await this.mailsService.moveMessage(mailerInfo);
    }

    @ApiOperation({ summary: 'Поставить флаг на сообщения' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Patch(Endpoints.MailService.Mails.AddFlag)
    @HttpCode(HttpStatusCode.Ok)
    public async addFlag(@Body() mailerInfo: MailsSetFlagDto): Promise<boolean> {
        return await this.mailsService.addFlag(mailerInfo);
    }

    @ApiOperation({ summary: 'Убрать флаг с сообщений' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Patch(Endpoints.MailService.Mails.RemoveFlag)
    @HttpCode(HttpStatusCode.Ok)
    public async removeFlag(@Body() mailerInfo: MailsSetFlagDto): Promise<boolean> {
        return await this.mailsService.removeFlag(mailerInfo);
    }

    @ApiOperation({ summary: 'Получение письма по id' })
    @ApiResponse({ status: HttpStatusCode.Ok })
    @Get(`/:id`)
    @HttpCode(HttpStatusCode.Ok)
    public async getMessageById(@Query() mailerInfo: MailsGetMessageDto, @Param('id') msgId: string): Promise<GetMailRDO> {
        return await this.mailsService.getMessageById(mailerInfo, msgId);
    }
}
