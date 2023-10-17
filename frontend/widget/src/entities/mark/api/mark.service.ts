import { $api } from '../../../app/api/configuration.service';
import { mailStore } from '../../../modules/mail-module';
import { AxiosError } from 'axios';
import { SelectedMailT } from '../../mails-list/lib/types';
import { AxiosErrorResponseType } from '../../../shared/lib/types';
import { notificationsStore } from '../../notification/model/store/notification.store';
import { MarkType } from '../lib/types';
import ENDPOINT from '../../../shared/lib/endpoints';
const { mark, addMark, removeMark } = ENDPOINT;

export const marksService = {
	async getMarks ():Promise<MarkType[]> {
		if (mailStore.mail) {
			const { data } = await $api.get(`${mark}?email=${mailStore.mail?.email}`);
			mailStore.changeFetchingStatus('marks', false);
			console.log('getMarks', data);
			return data;
		}
		return [];
	},
	async createMark (name: string, color: string):Promise<boolean> {
		try {
			await $api.post(mark, {
				email: mailStore.mail?.email,
				name,
				color
			});
			return true;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	},
	async updateMark (markId: string, name: string, color: string):Promise<boolean> {
		try {
			await $api.put(mark, {
				email: mailStore.mail?.email,
				markId,
				mark: {
					name,
					color
				}
			});
			return true;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	},
	async deleteMark (markId: string):Promise<boolean> {
		try {
			await $api.delete(mark, {
				data: {
					email: mailStore.mail?.email,
					markId
				}
			});
			return true;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	},
	async addMark (markIds: string[], msgIds:SelectedMailT[]):Promise<boolean> {
		try {
			const { data } = await $api.patch(addMark, {
				email: mailStore.mail!.email,
				msgIds,
				markIds
			});
			if (data) {
				return true;
			}
			return false;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message[0], 'danger');
			return false;
		}
	},
	async removeMark (markIds: string[], msgIds:SelectedMailT[]):Promise<boolean> {
		try {
			const { data } = await $api.patch(removeMark, {
				email: mailStore.mail!.email,
				msgIds,
				markIds
			});
			if (data) {
				return true;
			}
			return false;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	}
};