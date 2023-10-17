import React from 'react';
import { MailServicesType, ConfItemT } from '../../../../shared/lib/types';
import { MailRuSvg, YandexSvg, GoogleSvg } from '../../../../shared/svg';
import { COLORS } from '../../../../shared/lib/consts';

export const MAILS_SERVICES:Record<MailServicesType, MailServicesType> = {
	mailru: 'mailru',
	yandex: 'yandex',
	google: 'google'
};

export const MAILS_SERVICES_CONF: ConfItemT<MailServicesType>[] = [
	{
		value: 'google',
		title: 'Войти через Google',
		icon: <GoogleSvg height='16' width='16' color={COLORS.white_color} />
	},
	{
		value: 'yandex',
		title: 'Войти через Yandex',
		icon: <YandexSvg height='18' width='18' color={COLORS.white_color} />
	},
	{
		value: 'mailru',
		title: 'Войти через Mail.ru',
		icon: <MailRuSvg height='25' width='25' color={COLORS.white_color} />
	}
];