import { accountStore } from 'src/entities/account/model/store/account.store';
import { MailT } from '../../mails-list/lib/types';
import { emailStore } from 'src/entities/email';
import $api from 'src/app/http';
import ENDPOINTS from 'src/app/lib/consts/endpoints';
const { MAILS: { BASE } } = ENDPOINTS;

export const mailService = {
	async getMailBySeq ():Promise<MailT | null> {
		if (emailStore.email) {
			const { data } = await $api.get(`${BASE}/${emailStore.selectedMailIdentifier?.msgSeq}`, {
				params: {
					accountId: accountStore.accountId,
					email: emailStore.email,
					mailboxPath: emailStore.mailsFilter.path
				}
			});
			console.log('getMailView', data);
			return data.mail;
		}
		return null;
	}
};
