import { $api } from '../../../app/api/configuration.service';
import { CORPORATE_MAIL_ID } from '../../../shared/lib/consts';
import { ACCOUNT_ID, USER_ID } from '../../../shared/lib/mock';
import { MailBox } from '../../../shared/lib/types';
import ENDPOINT from '../../../shared/lib/endpoints';
const { emails } = ENDPOINT;

export const mailPageService = {
	async getPersonalMails ():Promise<MailBox[]> {
		const { data } = await $api.get(`${emails}?accountId=${ACCOUNT_ID}&managerId=${USER_ID}`);
		console.log('getPersonalMails', data);
		return data;
	},
	async getCorporateMails ():Promise<MailBox[]> {
		const { data } = await $api.get(`${emails}?accountId=${ACCOUNT_ID}&managerId=${CORPORATE_MAIL_ID}`);
		console.log('getCorporateMails', data);
		return data;
	}
};