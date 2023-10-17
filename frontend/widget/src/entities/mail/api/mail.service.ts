import { $api } from '../../../app/api/configuration.service';
import { mailStore } from '../../../modules/mail-module';
import { CORPORATE_MAIL_ID } from '../../../shared/lib/consts';
import { ACCOUNT_ID, USER_ID } from '../../../shared/lib/mock';
import { MailT } from '../../mails-list/lib/types';
import ENDPOINT from '../../../shared/lib/endpoints';

const { mails } = ENDPOINT;

export const mailService = {
	async getMailBySeq ():Promise<MailT | null> {
		if (mailStore.mail) {
			const { data } = await $api.get(`${mails}/${mailStore.selectedMailIdentifier?.msgSeq}`, {
				params: {
					accountId: ACCOUNT_ID,
					managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
					email: mailStore.mail.email,
					mailboxPath: mailStore.mailsFilter.path
				}
			});
			console.log('getMailView', data);
			return data.mail;
		}
		return null;
	}
};
