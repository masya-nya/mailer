import { Injectable } from '@nestjs/common';
import { ImapFlow } from 'imapflow';
import { EmailDocument } from '../email/models/email.model';
import { Logger } from 'src/core/logger/Logger';
import { EmailService } from '../email/email.service';
import { Types } from 'mongoose';
import { ApiError } from 'src/core/exceptions/api-error.exception';
import { ImapService } from 'src/core/services/imap/imap.service';
import MailsInfo from 'src/core/consts/mailsinfo';
import { ServiceFolders } from './consts/serviceFolders';

@Injectable()
export class MailsService {
	constructor(
		private readonly logger: Logger,
		private readonly emailService: EmailService,
		private readonly imapService: ImapService
	) {}

	public async initImap(
		accountId: Types.ObjectId,
		email: string
	): Promise<[ImapFlow, EmailDocument]> {
		try {
			const emailInstance = await this.emailService.find({
				accountId,
				email,
			});
			console.log(emailInstance);
			if (!emailInstance) {
				ApiError.NotFound('Такой Email не был найден');
			}
			this.emailService.checkYandexTokenValidity(emailInstance.accessToken);
			this.emailService.updateYandexToken(accountId, emailInstance);

			const imap = this.imapService.create(
				emailInstance.email,
				MailsInfo[emailInstance.serviceName].ImapHost,
				emailInstance.accessToken
			);

			return [imap, emailInstance];
		} catch (error) {
			this.logger.error(error);
			ApiError.InternalServerError('Такой Email не был найден');
		}
	}

	async getMails(
		accountId: Types.ObjectId,
		email: string,
		mailboxPath: string
	): Promise<void> {
		const [imap, { serviceName }] = await this.initImap(accountId, email);
		console.log(1);
		await imap.connect();

		console.log(2);
		const lock = await imap.getMailboxLock(
			mailboxPath in ServiceFolders[serviceName]
				? ServiceFolders[serviceName][mailboxPath]
				: mailboxPath
		);
		console.log(3);

		// const messages = imap.fetch('1:10', { uid: true });

		// console.log(messages);

		console.log(4);
		lock.release();
		console.log(5);
	}
}
