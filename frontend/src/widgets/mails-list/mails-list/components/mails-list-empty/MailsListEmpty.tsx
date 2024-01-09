import React, { useContext } from 'react';
import cl from './MailsListEmpty.module.scss';
import { EmailContext } from 'src/entities/email';

const MailsListEmpty = (): React.JSX.Element => {
	const { store: emailStore } = useContext(EmailContext);
	return (
		<div className={cl['mails-list-empty']}>
			<div className={cl['mails-list-empty__inner']}>
				В папке &quot;
				<span className={cl['mails-list-empty__path']}>
					{emailStore.mailsFilter.pathName}
				</span>
				&quot; писем нет
			</div>
		</div>
	);
};

export default MailsListEmpty;
