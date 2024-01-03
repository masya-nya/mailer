import { ConfItemT, MailServicesType, SWGColors } from 'src/shared/lib';
import { GoogleSvg, YandexSvg } from 'src/shared/svg';

export const MAILS_SERVICES: Record<MailServicesType, MailServicesType> = {
	yandex: 'yandex',
	google: 'google',
};

export const MAILS_SERVICES_CONF: ConfItemT<MailServicesType>[] = [
	{
		value: 'google',
		title: 'Войти через Google',
		icon: <GoogleSvg height="16px" width="16px" color={SWGColors.white} />,
	},
	{
		value: 'yandex',
		title: 'Войти через Yandex',
		icon: <YandexSvg height="18px" width="18px" color={SWGColors.white} />,
	},
];
