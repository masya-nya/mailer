import { CSSProperties, FC, ReactNode, useContext } from 'react';
import cl from './AuthButton.module.scss';
import { MailServicesType } from 'src/shared/lib';
import cn from 'classnames';
import { API_URL } from 'src/app/lib/config';
import { observer } from 'mobx-react-lite';
import { AccountContext } from 'src/entities/account';

interface AuthButtonProps {
	type: MailServicesType
	title: string
	icon: ReactNode
	className?: string
	style?: CSSProperties
}

export const AuthButton:FC<AuthButtonProps> = observer(({ type, title, icon }) => {
	const { store: accountStore } = useContext(AccountContext);

	return (
		<a
			href={`${API_URL}/mail-auth/${type}-auth?accountId=${accountStore.accountId}&redirectClientUri=${encodeURIComponent(window.location.origin)}`}
			className={cn(cl['auth-button'], cl[`auth-button--${type}`])}
			mail-type={type}
		>
			<div className={cl['auth-button__icon']}>
				{ icon }
			</div>
			<div className={cl['auth-button__title']}>
				{ title }
			</div>
		</a>
	);
});