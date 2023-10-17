import React from 'react';
import { SendSvg, DeleteSvg, SpamSvg, IncomingSvg } from '../../../../shared/svg';
import { baseMailBoxesValue, baseMailBoxesTitle } from '../types';
import { ConfItemT } from '../../../../shared/lib/types';
import { COLORS } from '../../../../shared/lib/consts';

export const MAIL_TYPES_CONF: ConfItemT<baseMailBoxesValue, baseMailBoxesTitle>[] = [
	{
		title: 'Входящие',
		value: 'inbox',
		icon: <IncomingSvg width='20' height='20' color={COLORS.font_base_color} />
	},
	{
		title: 'Отправленные',
		value: 'sent',
		icon: <SendSvg width='20' height='20' color={COLORS.font_base_color} />
	},
	{
		title: 'Удаленные',
		value: 'deleted',
		icon: <DeleteSvg width='20' height='20' color={COLORS.font_base_color} />
	},
	{
		title: 'Спам',
		value: 'spam',
		icon: <SpamSvg width='20' height='20' color={COLORS.font_base_color} />
	}
];

export const MAIL_TYPES_AMOUNT_TEMPLATE:Record<baseMailBoxesValue, number> = {
	inbox: 0,
	sent: 0,
	deleted: 0,
	spam: 0
};