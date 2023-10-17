import { AxiosError } from 'axios';
import { $api } from '../../../../app/api/configuration.service';
import { notificationsStore } from '../../../../entities/notification';
import { ACCOUNT_ID, AxiosErrorResponseType, MailBox } from '../../../../shared/lib';
import ENDPOINTS from '../../../../shared/lib/endpoints';
const { emails } = ENDPOINTS;

export const userRightsService = {
	async updateUserRights (updatedEmails: MailBox[]):Promise<boolean> {
		try {
			const { data: status } = await $api.patch(emails, {
				accountId: ACCOUNT_ID,
				emails: updatedEmails
			});
			status && notificationsStore.addNotification('Успех', 'Права обновлены', 'primary');
			return true;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	}
};