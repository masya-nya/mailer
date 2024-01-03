import { CSSProperties, FC } from 'react';
import cl from './MailBoxes.module.scss';
import { MailBox } from './components/mail-box/MailBox';
import { MAIL_TYPES_CONF } from 'src/entities/mail-boxes';

interface MailBoxesProps {
	className?: string
	style?: CSSProperties
}

export const MailBoxes:FC<MailBoxesProps> = () => {
	return (
		<div className={cl['mail-boxes']}>
			{
				MAIL_TYPES_CONF.map(mailbox =>
					<MailBox
						mailbox={mailbox}
						key={mailbox.value}
					/>
				)
			}
		</div>
	);
};