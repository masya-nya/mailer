import { baseMailBoxesValue, baseMailBoxesTitle } from '../types';
import { ConfItemT } from '../../../../shared/lib/types';
import { DeleteSvg, IncomingSvg, SendSvg, SpamSvg } from 'src/shared/svg';
import { SWGColors } from 'src/shared/lib';

export const MAIL_TYPES_CONF: ConfItemT<
	baseMailBoxesValue,
	baseMailBoxesTitle
>[] = [
	{
		title: 'Входящие',
		value: 'inbox',
		icon: (
			<IncomingSvg width="24px" height="24px" color={SWGColors.grey}
			/>
		),
	},
	{
		title: 'Отправленные',
		value: 'sent',
		icon: <SendSvg width="24px" height="24px" color={SWGColors.grey} />,
	},
	{
		title: 'Удаленные',
		value: 'deleted',
		icon: (
			<DeleteSvg width="24px" height="24px" color={SWGColors.grey} />
		),
	},
	{
		title: 'Спам',
		value: 'spam',
		icon: <SpamSvg width="24px" height="24px" color={SWGColors.grey} />,
	},
];

export const MAIL_TYPES_AMOUNT_TEMPLATE: Record<baseMailBoxesValue, number> = {
	inbox: 0,
	sent: 0,
	deleted: 0,
	spam: 0,
};
