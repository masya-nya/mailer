import { AxiosError } from 'axios';
import { $api } from '../../../app/api/configuration.service';
import { mailStore } from '../../../modules/mail-module';
import { CORPORATE_MAIL_ID } from '../../../shared/lib/consts';
import ENDPOINT from '../../../shared/lib/endpoints';
import { ACCOUNT_ID, USER_ID } from '../../../shared/lib/mock';
import { AxiosErrorResponseType } from '../../../shared/lib/types';
import { notificationsStore } from '../../notification';
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
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
		}
	}
};