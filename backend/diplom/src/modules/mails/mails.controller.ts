import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GetMessagesDTO } from './DTO/get-messages.dto';
import { MailsService } from './mails.service';
import ENDPOINTS from 'src/core/consts/endpoint';
const { MAILS: { BASE } } = ENDPOINTS;


@Controller(BASE)
export class MailsController {

	constructor(
		private readonly mailsService: MailsService
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	getMessages(@Query() getMessagesDTO: GetMessagesDTO):void {
		const { accountId, email, mailboxPath } = getMessagesDTO;
		this.mailsService.getMails(accountId, email, mailboxPath);
		return;
	}
}