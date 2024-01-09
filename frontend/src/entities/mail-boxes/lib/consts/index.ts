import { baseMailBoxesT, baseMailBoxesValue } from '../types';

export const BASE_MAIL_TYPES: Record<baseMailBoxesValue, baseMailBoxesT> = {
	inbox: {
		title: 'Входящие',
		value: 'inbox'
	},
	sent: {
		title: 'Отправленные',
		value: 'sent'
	},
	deleted: {
		title: 'Удаленные',
		value: 'deleted'
	},
	spam: {
		title: 'Спам',
		value: 'spam'
	}
};

export enum SWRMailBoxesNames {
	unreadCount = 'unreadCount',
	importantCount = 'importantCount',
	MailBoxesCount = 'MailBoxesCount',
}