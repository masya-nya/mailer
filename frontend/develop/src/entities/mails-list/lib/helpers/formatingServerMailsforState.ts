import { ServerMailT, MailT } from '../types';

export const formatingServerMailsforState = (mails: ServerMailT[]): MailT[] => {
	return mails.map(mail => {
		return { ...mail, checked: false, marks: mail?.marks || [] };
	});
};
