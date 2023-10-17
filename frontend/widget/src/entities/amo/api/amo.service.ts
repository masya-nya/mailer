import { AxiosError } from 'axios';
import { $api } from '../../../app/api/configuration.service';
import ENDPOINTS from '../../../shared/lib/endpoints';
import { ACCOUNT_ID } from '../../../shared/lib/mock';
import { ServerMailT } from '../../mails-list/lib/types';
import { notificationsStore } from '../../notification';
import { AxiosErrorResponseType } from '../../../shared/lib/types';
const { amoEntityLeads, amoEntityContacts, amoEntityCustomers } = ENDPOINTS;

export const amoService = {
	async createLeads (mails: (ServerMailT | null)[], responsibleUser: number, nextDate: number, isTriggerNote:boolean):Promise<boolean> {
		try {
			const { data: status } = await $api.post(amoEntityLeads, {
				accountId: ACCOUNT_ID,
				responsibleUser,
				isTriggerNote,
				nextDate,
				mails
			});
			status && notificationsStore.addNotification('Успех', 'Сделки успешно созданы', 'primary');
			return true;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	},
	async createContacts (mails: (ServerMailT | null)[], responsibleUser: number, nextDate: number, isTriggerNote:boolean):Promise<boolean> {
		try {
			const { data: status } = await $api.post(amoEntityContacts, {
				accountId: ACCOUNT_ID,
				responsibleUser,
				isTriggerNote,
				nextDate,
				mails
			});
			status && notificationsStore.addNotification('Успех', 'Контакты успешно созданы', 'primary');
			return true;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	},
	async createCustomers (mails: (ServerMailT | null)[], responsibleUser: number, nextDate: number, isTriggerNote:boolean):Promise<boolean> {
		try {
			const { data: status } = await $api.post(amoEntityCustomers, {
				accountId: ACCOUNT_ID,
				responsibleUser,
				isTriggerNote,
				nextDate,
				mails
			});
			status && notificationsStore.addNotification('Успех', 'Покупатели успешно созданы', 'primary');
			return true;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	}
};