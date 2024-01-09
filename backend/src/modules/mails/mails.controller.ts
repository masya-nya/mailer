import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { GetPageOfMailsDTO } from './DTO/get-page-of-mails.dto';
import { MailsService } from './mails.service';
import ENDPOINTS from 'src/core/consts/endpoint';
import {
	GetMailRDO,
	GetMailsPageRDO,
	MailCountInBoxesRDO,
} from './types/mails.rdo';
import { GetOneMailDTO } from './DTO/get-one-mail.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SendMessasgeDTO } from './DTO/send-message.dto';
import validateFilesMaxSize from 'src/core/utils/validateFilesMaxSize';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { GetMailsCountDTO } from './DTO/get-mails-count.dto';
import { MailsMoveMessageDTO } from './DTO/mails-move-message.dto';
import { MailsSetFlagDTO } from './DTO/mails-set-flag.dto';
import { Logger } from 'src/core/logger/Logger';
const {
	MAILS: { BASE, COUNT_IN_BOXES, ADD_FLAG, MOVE_MESSAGE, REMOVE_FLAG },
} = ENDPOINTS;

@Controller(BASE)
export class MailsController {
	constructor(
		private readonly logger: Logger,
		private readonly mailsService: MailsService
	) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FilesInterceptor('files'))
	public async sendMail(
		@Body() mailerInfo: SendMessasgeDTO,
		@UploadedFiles() files: Express.Multer.File[]
	): Promise<boolean> {
		this.logger.info('Запрос на отправку сообщения');
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
		this.logger.info('Запрос на получение сообщений');
		return await this.mailsService.getPageByDateAndQuery(getPageOfMailsDTO);
	}

	@Get(COUNT_IN_BOXES)
	@HttpCode(HttpStatus.OK)
	public async getMailCountInBoxes(
		@Query() mailerInfo: GetMailsCountDTO
	): Promise<MailCountInBoxesRDO> {
		this.logger.info('Запрос на кол-во сообщений в ящиках');
		return await this.mailsService.getMailCountInBoxes(mailerInfo);
	}

	@Get(`/:id`)
	@HttpCode(HttpStatus.OK)
	public async getMessageById(
		@Query() mailerInfo: GetOneMailDTO,
		@Param('id') msgSeq: string
	): Promise<GetMailRDO> {
		this.logger.info('Запрос на получение одного сообщения');
		return await this.mailsService.getMessageById(mailerInfo, msgSeq);
	}

	@Patch(MOVE_MESSAGE)
	@HttpCode(HttpStatus.OK)
	public async mailMove(
		@Body() mailerInfo: MailsMoveMessageDTO
	): Promise<boolean> {
		this.logger.info('Запрос на перемещение собщений');
		return await this.mailsService.moveMessage(mailerInfo);
	}

	@Patch(ADD_FLAG)
	@HttpCode(HttpStatus.OK)
	public async addFlag(
		@Body() mailerInfo: MailsSetFlagDTO
	): Promise<boolean> {
		this.logger.info('Запрос на добавление флага');
		return await this.mailsService.addFlag(mailerInfo);
	}

	@Patch(REMOVE_FLAG)
	@HttpCode(HttpStatus.OK)
	public async removeFlag(
		@Body() mailerInfo: MailsSetFlagDTO
	): Promise<boolean> {
		this.logger.info('Запрос на удаление флага');
		return await this.mailsService.removeFlag(mailerInfo);
	}
}