import { AxiosError } from 'axios';
import { $api } from '../../../app/api/configuration.service';
import { mailStore } from '../../../modules/mail-module';
import { CORPORATE_MAIL_ID } from '../../../shared/lib/consts';
import { ACCOUNT_ID, USER_ID } from '../../../shared/lib/mock';
import { DELIMITER, AxiosErrorResponseType } from '../../../shared/lib/types';
import { notificationsStore } from '../../notification/model/store/notification.store';
import { FolderType } from '../lib/types';
import ENDPOINT from '../../../shared/lib/endpoints';
const { folder } = ENDPOINT;

export const foldersService = {
	async getFolders ():Promise<FolderType[]> {
		if (mailStore.mail) {
			const { data } = await $api.get(`${folder}?accountId=${ACCOUNT_ID}&managerId=${mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID}&email=${mailStore.mail?.email}`);
			mailStore.changeFetchingStatus('folders', false);
			console.log('getFolders', data);
			return data;
		}
		return [];
	},
	async createFolder (name: string, path: string | null, delimiter: DELIMITER):Promise<boolean> {
		console.log(path, name, delimiter);
		try {
			await $api.post(`${folder}?accountId=${ACCOUNT_ID}&managerId=${mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID}&email=${mailStore.mail?.email}`, {
				path,
				name,
				delimiter
			});
			return true;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	},
	async updateFolder (name: string, path: string, delimiter: DELIMITER):Promise<boolean> {
		try {
			await $api.patch(`${folder}?accountId=${ACCOUNT_ID}&managerId=${mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID}&email=${mailStore.mail?.email}`, {
				path,
				name,
				delimiter
			});
			return true;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	},
	async deleteFolder (path: string):Promise<boolean> {
		try {
			await $api.delete(`${folder}?accountId=${ACCOUNT_ID}&managerId=${mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID}&email=${mailStore.mail?.email}`, {
				data: {
					path
				}
			});
			return true;
		} catch (e) {
			const err = e as AxiosError<AxiosErrorResponseType>;
			const { message, error } = err.response!.data;
			notificationsStore.addNotification(error, message, 'danger');
			return false;
		}
	}
};