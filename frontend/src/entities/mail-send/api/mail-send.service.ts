
import { emailStore } from 'src/entities/email';
import { errorOutputHandler, formDataBuilding } from '../../../shared/lib/helpers';
import { notificationsStore } from '../../notification/model/store/notification.store';
import { SendDataType } from '../lib/type';
import $api from 'src/app/http';
import { accountStore } from 'src/entities/account/model/store/account.store';
import ENDPOINTS from 'src/app/lib/consts/endpoints';
const { MAILS: { BASE } } = ENDPOINTS;

export const MailSendService = {
	async sendMail (
		{ ...sendData }: SendDataType
	) {
		try {
			const formData = formDataBuilding(
				{
					...sendData,
					accountId: accountStore.accountId,
					email: emailStore.email,
					mailboxPath: emailStore.mailsFilter.path
				}
			);
			const { data: response } = await $api.post(BASE, formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			);
			console.log(response);
			notificationsStore.addNotification('Успех!', 'Сообщение отправлено', 'primary');
			return true;
		} catch (e) {
			errorOutputHandler(e);
			return false;
		}
	}
};