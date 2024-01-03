import React, { useState } from 'react';
import cl from './Email.module.scss';
import { ServerMailT, SelectedMailT } from '../../../../entities/mails-list/lib/types';
import { COLORS } from '../../../lib/consts';
import { EmailSvg, CrossSvg } from '../../../svg';

type EmailProps = {
	mail: ServerMailT | undefined
	removeEmailsHandler: (identifiers:SelectedMailT) => void
}

export const Email = ({ mail, removeEmailsHandler }:EmailProps):React.JSX.Element | null => {
	const [hovered, setHovered] = useState(false);

	if (!mail) return null;

	return (
		<div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={cl['email']}>
			<div className={cl['email__icon']}>
				<EmailSvg width='70' height='70' color={COLORS.font_base_color} />
				{
					hovered &&
					<span className={cl['email__remove']}>
						<CrossSvg clickHandler={() => removeEmailsHandler({ msgId: mail.msgId, msgSeq: mail.msgSeq })} width='25' height='25' style={{ cursor: 'pointer' }} color={COLORS.red_color} />
					</span>
				}
			</div>
			<div className={cl['email__name']}>
				<span className={cl['email__name-inner']} title={mail.subject || '(Без темы)'}>
					{ mail.subject || '(Без темы)' }
				</span>
			</div>
		</div>
	);
};