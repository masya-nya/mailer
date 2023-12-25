import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { GetPageOfMailsDTO } from './DTO/get-page-of-mails.dto';
import { MailsService } from './mails.service';
import ENDPOINTS from 'src/core/consts/endpoint';
import { GetMailRDO, GetMailsPageRDO, MailCountInBoxesRDO } from './types/mails.rdo';
import { GetOneMailDTO } from './DTO/get-one-mail.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SendMessasgeDTO } from './DTO/send-message.dto';
import validateFilesMaxSize from 'src/core/utils/validateFilesMaxSize';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { GetMailsCountDTO } from './DTO/get-mails-count.dto';
const {
	MAILS: { BASE, COUNT_IN_BOXES },
} = ENDPOINTS;

@Controller(BASE)
export class MailsController {
	constructor(private readonly mailsService: MailsService) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FilesInterceptor('files'))
	public async sendMail(
		@Body() mailerInfo: SendMessasgeDTO,
		@UploadedFiles() files: Express.Multer.File[]
	): Promise<boolean> {
		if (files && !validateFilesMaxSize(files)) {
			ApiError.PayloadTooLarge();
		}
		return await this.mailsService.sendMail(mailerInfo, files);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async getMessages(
		@Query() getPageOfMailsDTO: GetPageOfMailsDTO
	): Promise<GetMailsPageRDO> {
		return await this.mailsService.getPageByDateAndQuery(getPageOfMailsDTO);
	}

	@Get(COUNT_IN_BOXES)
	@HttpCode(HttpStatus.OK)
	public async getMailCountInBoxes(
		@Query() mailerInfo: GetMailsCountDTO
	): Promise<MailCountInBoxesRDO> {
		return await this.mailsService.getMailCountInBoxes(mailerInfo);
	}

	@Get(`/:id`)
	@HttpCode(HttpStatus.OK)
	public async getMessageById(
		@Query() mailerInfo: GetOneMailDTO,
		@Param('id') msgSeq: string
	): Promise<GetMailRDO> {
		return await this.mailsService.getMessageById(mailerInfo, msgSeq);
	}
}
