import { ServerMailT } from '../../../mails-list/lib/types';

export type AmoActionTypesT = 'lead' | 'contact' | 'customer';
export type AmoActionsConfT = {
	title: string
	action: (mails: (ServerMailT | null)[], responsibleUser: number, nextDate: number, isTriggerNote:boolean) => Promise<boolean>
}