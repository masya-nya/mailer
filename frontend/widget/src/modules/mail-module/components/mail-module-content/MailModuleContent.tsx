import React from 'react';
import cl from './MailModuleContent.module.scss';
import { observer } from 'mobx-react-lite';
import { mailStore } from '../../model/store/mail-module.store';
import { MailModuleRoutes } from '../../lib/config';

const MailModuleContent = observer(():React.JSX.Element => {
	return (
		<div className={cl['mailmodule__content']}>
			{
				MailModuleRoutes[mailStore.mailContentRoute]
			}
		</div>
	);
});

export default MailModuleContent;
