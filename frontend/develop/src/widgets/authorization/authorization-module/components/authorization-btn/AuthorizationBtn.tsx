import React from 'react';
import cl from './AuthorizationBtn.module.scss';
import cn from 'classnames';
import { mailStore } from '../../../../../modules/mail-module';
import { BASE_URL, CORPORATE_MAIL_ID, ACCOUNT_ID, USER_ID, MailServicesType } from '../../../../../shared/lib';

type AuthorizationBtnProps = {
	type: MailServicesType
	title: string
	icon: React.JSX.Element
}

const AuthorizationBtn = ({ type, title, icon }:AuthorizationBtnProps):React.JSX.Element => {
	return (
		<a
			href={`${BASE_URL}/mail-auth/${type}-auth?amoid=${ACCOUNT_ID}&redirectClientUri=${encodeURIComponent(window.location.href)}&managerId=${mailStore.isCorporate ? CORPORATE_MAIL_ID : USER_ID}`}
			className={cn(cl['authtorization-btn'], cl[`authtorization-btn--${type}`])}
			mail-type={type}
		>
			<div className={cl['authtorization-btn__icon']}>
				{ icon }
			</div>
			<div className={cl['authtorization-btn__title']}>
				{ title }
			</div>
		</a>
	);
};

export default AuthorizationBtn;
