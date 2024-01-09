
import { mailsPageT, SelectedMailT } from '..';
import $api from 'src/app/http';
import { errorOutputHandler } from 'src/shared/lib';
import { accountStore } from 'src/entities/account/model/store/account.store';
import { emailStore } from 'src/entities/email';
import ENDPOINTS from 'src/app/lib/consts/endpoints';
const { MAILS: { BASE, ADD_FLAG, REMOVE_FLAG, MOVE_MESSAGE } } = ENDPOINTS;

export const mailsService = {
	async getMails ():Promise<mailsPageT | null> {
		if (emailStore.email) {
			const { data } = await $api.get(BASE, {
				params: {
					accountId: accountStore.accountId,
					email: emailStore.email,
					limit: emailStore.mailsFilter.limit,
					page: emailStore.mailsFilter.page,
					mailboxPath: emailStore.mailsFilter.path
				}
			});
			console.log('getMails', data);
			return data;
		}
		return null;
	},
	async addMsgFlag (flag: string, msgIds:SelectedMailT[]):Promise<boolean> {
		try {
			const { data } = await $api.patch(`${BASE}/${ADD_FLAG}`, {
				accountId: accountStore.accountId,
				email: emailStore!.email,
				flag,
				msgIds,
				mailboxPath: emailStore.mailsFilter.path
			});
			if (data) {
				return true;
			}
			return false;
		} catch (e) {
			errorOutputHandler(e);
			return false;
		}
	},
	async removeMsgFlag (flag: string, msgIds:SelectedMailT[]):Promise<boolean> {
		try {
			const { data } = await $api.patch(`${BASE}/${REMOVE_FLAG}`, {
				accountId: accountStore.accountId,
				email: emailStore!.email,
				flag,
				msgIds,
				mailboxPath: emailStore.mailsFilter.path
			});
			if (data) {
				return true;
			}
			return false;
		} catch (e) {
			errorOutputHandler(e);
			return false;
		}
	},
	async moveMsg (mailboxDestinationPath: string, msgIds:SelectedMailT[]):Promise<boolean> {
		try {
			const { data } = await $api.patch(`${BASE}/${MOVE_MESSAGE}`, {
				accountId: accountStore.accountId,
				email: emailStore.email,
				mailboxPath: emailStore.mailsFilter.path,
				mailboxDestinationPath,
				msgIds
			});
			if (data) {
				return true;
			}
			return false;
		} catch (e) {
			errorOutputHandler(e);
			return false;
		}
	}
};