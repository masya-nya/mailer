import React from 'react';
import cl from './AuthorizationModule.module.scss';
import AuthorizationBtn from './components/authorization-btn/AuthorizationBtn';
import { MAILS_SERVICES_CONF } from '../lib/config';
import { mailStore } from '../../../modules/mail-module';
import { IS_ADMIN } from '../../../shared/lib';
import { ErrorText } from '../../../shared/UI';

export const AuthorizationModule = (): React.JSX.Element => {
	return (
		<div className={cl['authorization']}>
			{
				(!mailStore.isCorporate || (mailStore.isCorporate && IS_ADMIN))
					? <div className={cl['authorization__body']}>
						<div className={cl['authorization__header']}>
							Выберите способ авторизации:
						</div>
						<div className={cl['authorization__btns']}>
							{
								MAILS_SERVICES_CONF.map(MAIL => <AuthorizationBtn type={MAIL.value} title={MAIL.title} icon={MAIL.icon} key={MAIL.value} />)
							}
						</div>
					</div>
					: <ErrorText title='Недостаточно прав для добавления корпоративной почты' />
			}
		</div>
	);
};
