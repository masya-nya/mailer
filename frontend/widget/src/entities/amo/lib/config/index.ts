import { amoService } from '../../api/amo.service';
import { AmoActionTypesT, AmoActionsConfT } from '../types';

export const AmoActionsConf:Record<AmoActionTypesT, AmoActionsConfT> = {
	contact: {
		title: 'Доб. контакт',
		action: amoService.createContacts
	},
	lead: {
		title: 'Доб. сделку',
		action: amoService.createLeads
	},
	customer: {
		title: 'Доб. покупателя',
		action: amoService.createCustomers
	}
};
