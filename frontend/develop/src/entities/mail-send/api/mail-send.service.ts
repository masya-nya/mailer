import { $api } from '../../../app/api/configuration.service';
import { mailStore } from '../../../modules/mail-module';
import { errorOutputHandler, formDataBuilding } from '../../../shared/lib/helpers';
import { ACCOUNT_ID, USER_ID } from '../../../shared/lib/mock';
import { notificationsStore } from '../../notification/model/store/notification.store';
import { SendDataType } from '../lib/type';
import ENDPOINTS from '../../../shared/lib/endpoints';
import { CORPORATE_MAIL_ID } from '../../../shared/lib';
const { mails } = ENDPOINTS;

export const MailSendService = {
	async sendMail (
		{ ...sendData }: SendDataType
	) {
		try {
			const formData = formDataBuilding(
				{
					...sendData,
					accountId: ACCOUNT_ID,
					managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
					email: mailStore.mail!.email,
					mailboxPath: mailStore.mailsFilter.path
				}
			);
			const { data: response } = await $api.post(mails, formData,
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