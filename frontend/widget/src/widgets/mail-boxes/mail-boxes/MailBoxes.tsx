import React from 'react';
import cl from './MailBoxes.module.scss';
import { MAIL_TYPES_CONF, MAIL_TYPES_AMOUNT_TEMPLATE, useBaseMailBoxesCount } from '../../../entities/mail-boxes';
import MailBox from './components/mail-box/MailBox';

export const MailBoxes = ():React.JSX.Element => {
	const { data: mailBoxesCount } = useBaseMailBoxesCount();

	return (
		<div className={cl['base-mail-types']}>
			{
				MAIL_TYPES_CONF.map(mailbox =>
					<MailBox
						mailbox={mailbox}
						amount={mailBoxesCount ? mailBoxesCount[mailbox.value] : MAIL_TYPES_AMOUNT_TEMPLATE[mailbox.value]}
						key={mailbox.value}
					/>
				)
			}
		</div>
	);
};
