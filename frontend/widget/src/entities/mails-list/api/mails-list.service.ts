import { AxiosError } from 'axios';
import { $api } from '../../../app/api/configuration.service';
import { mailStore } from '../../../modules/mail-module';
import { CORPORATE_MAIL_ID } from '../../../shared/lib/consts';
import { ACCOUNT_ID, USER_ID } from '../../../shared/lib/mock';
import { AxiosErrorResponseType } from '../../../shared/lib/types';
import { notificationsStore } from '../../notification/model/store/notification.store';
import { mailsPageT, SelectedMailT } from '..';
import ENDPOINT from '../../../shared/lib/endpoints';
const { mails, addFlag, removeFlag, moveMsgs } = ENDPOINT;

export const mailsService = {
	async getMails ():Promise<mailsPageT | null> {
		if (mailStore.mail) {
			const { data } = await $api.get(mails, {
				params: {
					accountId: ACCOUNT_ID,
					managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
					email: mailStore.mail.email,
					limit: mailStore.mailsFilter.limit,
					page: mailStore.mailsFilter.page,
					filterQuery: mailStore.mailsFilter.filterQuery,
					filterQueryValue: mailStore.mailsFilter.filterQueryValue,
					dateFrom: mailStore.mailsFilter.dateFrom,
					dateTo: mailStore.mailsFilter.dateTo,
					markId: mailStore.mailsFilter.markId,
					mailboxPath: mailStore.mailsFilter.path
				}
			});
			mailStore.changeFetchingStatus('mails', false);
			console.log('getMails', data);
			return data;
		}
		return null;
	},
	async addMsgFlag (flag: string, msgIds:SelectedMailT[]):Promise<boolean> {
		try {
			const { data } = await $api.patch(addFlag, {
				accountId: ACCOUNT_ID,
				managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
				email: mailStore!.mail!.email,
				flag,
				msgIds,
				mailboxPath: mailStore.mailsFilter.path
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
	},
	async removeMsgFlag (flag: string, msgIds:SelectedMailT[]):Promise<boolean> {
		try {
			const { data } = await $api.patch(removeFlag, {
				accountId: ACCOUNT_ID,
				managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
				email: mailStore!.mail!.email,
				flag,
				msgIds,
				mailboxPath: mailStore.mailsFilter.path
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
	},
	async moveMsg (mailboxDestinationPath: string, msgIds:SelectedMailT[]):Promise<boolean> {
		try {
			const { data } = await $api.patch(moveMsgs, {
				accountId: ACCOUNT_ID,
				managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
				email: mailStore.mail!.email,
				mailboxPath: mailStore.mailsFilter.path,
				mailboxDestinationPath,
				msgIds
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