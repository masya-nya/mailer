import { MailsFilterConfT } from '../type/mails-filter.type';

export const MAILS_FILTER_CONF: MailsFilterConfT[] = [
	{
		title: 'Все письма',
		query: 'all',
		queryValue: true
	},
	{
		title: 'Непрочитанные',
		query: 'seen',
		queryValue: false
	},
	{
		title: 'С флажком',
		query: 'flagged',
		queryValue: true
	}
];