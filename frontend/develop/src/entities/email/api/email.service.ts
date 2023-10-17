import { $api } from '../../../app/api/configuration.service';
import { mailStore } from '../../../modules/mail-module';
import { CORPORATE_MAIL_ID } from '../../../shared/lib/consts';
import ENDPOINT from '../../../shared/lib/endpoints';
import { ACCOUNT_ID, USER_ID } from '../../../shared/lib/mock';
import { errorOutputHandler } from '../../../shared/lib';
const { emails } = ENDPOINT;

export const emailsService = {
	async deleteMail (mail: string):Promise<void> {
		try {
			await $api.delete(emails, {
				data: {
					accountId: ACCOUNT_ID,
					managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
					email: mail
				}
			});
		} catch (e) {
			errorOutputHandler(e);
		}
	}
};