export { SWGColors } from './swg-color';
export { SWRKeys } from './swr-keys';

import { MailIMAPServicesType } from '../types';

export enum COLORS {
	font_base_color = '#555',
	font_darker_color = '#333',
	black_color = '#000',
	white_color = '#FFF',
	red_color = '#E20000',
	yellow_color = '#FFDB4D',
	blue_color = '#4C8BF7',
	orange_color = '#FF8A1F',
}
export enum UnitsOfSize {
	GB = 1073741824,
	MB = 1048576,
	KB = 1024,
}
export const FilesMaxSize = 20971520;
export const EmailRegValidation =
	/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const IMAPServiceNames: Record<
	MailIMAPServicesType,
	MailIMAPServicesType
> = {
	Yandex: 'Yandex',
	Google: 'Google',
};
export const CORPORATE_MAIL_ID = -1;
export const ONE_SECOND = 1000;
export const MAIN_PALETTE = [
	'#4ACF57',
	'#51AAAD',
	'#6083D6',
	'#8B6BDC',
	'#3E96BB',
	'#FF9881',
	'#FEA75F',
	'#F36376',
	'#ccc8f9',
	'#ffeab2',
	'#ffdc7f',
	'#ffce5a',
	'#ffdbdb',
	'#ffc8c8',
	'#ff8f92',
	'#eb93ff',
	'#d6eaff',
	'#c1e0ff',
	'#98cbff',
	'#87f2c0',
	'#f9deff',
	'#f3beff',
];
