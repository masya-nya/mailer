import { $api } from '../../../app/api/configuration.service';
import { mailStore } from '../../../modules/mail-module';
import { CORPORATE_MAIL_ID } from '../../../shared/lib/consts';
import ENDPOINT from '../../../shared/lib/endpoints';
import { ACCOUNT_ID, USER_ID } from '../../../shared/lib/mock';
import { MAIL_TYPES_AMOUNT_TEMPLATE } from '../lib/config';
import { SWRMailBoxesNames } from '../lib/consts';
import { baseMailBoxesValue } from '../lib/types';
const { MailBoxesCount } = ENDPOINT;

export const baseMailBoxesService = {
	async getBaseMailBoxesCount ():Promise<Record<baseMailBoxesValue, number>> {
		if (mailStore.mail) {
			const { data } = await $api.get(`${MailBoxesCount}?accountId=${ACCOUNT_ID}&managerId=${mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID}&email=${mailStore.mail?.email}`);
			mailStore.changeFetchingStatus(SWRMailBoxesNames.MailBoxesCount, false);
			return data;
		}
		return MAIL_TYPES_AMOUNT_TEMPLATE;
	}
};