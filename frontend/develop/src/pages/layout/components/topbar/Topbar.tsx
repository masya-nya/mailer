import { CSSProperties, FC } from 'react';
import cl from './Topbar.module.scss';
import { useLocation } from 'react-router-dom';
import { ROUTES_TITLE } from 'src/app/router/config';
import { ChangeAccount } from 'src/features/account';

interface TopbarProps {
	className?: string;
	style?: CSSProperties;
}

export const Topbar: FC<TopbarProps> = ({ ...props }) => {
	const { pathname } = useLocation();

	

	return (
		<div {...props} className={cl['topbar']}>
			<div className={cl['topbar__title']}>{ROUTES_TITLE[pathname]}</div>
			<div className={cl['topbar__account-select']}>
				<ChangeAccount />
			</div>
		</div>
	);
};
