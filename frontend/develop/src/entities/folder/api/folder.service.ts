import { $api } from '../../../app/api/configuration.service';
import { mailStore } from '../../../modules/mail-module';
import { CORPORATE_MAIL_ID } from '../../../shared/lib/consts';
import { ACCOUNT_ID, USER_ID } from '../../../shared/lib/mock';
import { DELIMITER } from '../../../shared/lib/types';
import { FolderType } from '../lib/types';
import ENDPOINT from '../../../shared/lib/endpoints';
import { errorOutputHandler } from '../../../shared/lib';
const { folder } = ENDPOINT;

export const foldersService = {
	async getFolders ():Promise<FolderType[]> {
		if (mailStore.mail) {
			const { data } = await $api.get(folder, {
				params: {
					accountId: ACCOUNT_ID,
					managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
					email: mailStore.mail.email
				}
			});
			mailStore.changeFetchingStatus('folders', false);
			console.log('getFolders', data);
			return data;
		}
		return [];
	},
	async createFolder (name: string, path: string | null, delimiter: DELIMITER):Promise<boolean> {
		try {
			if (mailStore.mail) {
				await $api.post(folder,
					{
						path,
						name,
						delimiter
					},
					{
						params: {
							accountId: ACCOUNT_ID,
							managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
							email: mailStore.mail.email
						}
					});
				return true;
			}
			return false;
		} catch (e) {
			errorOutputHandler(e);
			return false;
		}
	},
	async updateFolder (name: string, path: string, delimiter: DELIMITER):Promise<boolean> {
		try {
			if (mailStore.mail) {
				await $api.patch(folder, {
					path,
					name,
					delimiter
				},
				{
					params: {
						accountId: ACCOUNT_ID,
						managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
						email: mailStore.mail.email
					}
				});
				return true;
			}
			return false;
		} catch (e) {
			errorOutputHandler(e);
			return false;
		}
	},
	async deleteFolder (path: string):Promise<boolean> {
		try {
			if (mailStore.mail) {
				await $api.delete(`${folder}?accountId=${ACCOUNT_ID}&managerId=${mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID}&email=${mailStore.mail?.email}`, {
					data: {
						path
					},
					params: {
						accountId: ACCOUNT_ID,
						managerId: mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID,
						email: mailStore.mail.email
					}
				});
				return true;
			}
			return false;
		} catch (e) {
			errorOutputHandler(e);
			return false;
		}
	}
};