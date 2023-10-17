import React from 'react';
import cl from './MailsListEmpty.module.scss';
import { mailStore } from '../../../../../modules/mail-module';

const MailsListEmpty = ():React.JSX.Element => {
	return (
		<div className={cl['mails-list-empty']}>
			<div className={cl['mails-list-empty__inner']}>В папке &quot;<span className={cl['mails-list-empty__path']}>{ mailStore.mailsFilter.pathName }</span>&quot; писем нет</div>
		</div>
	);
};

export default MailsListEmpty;