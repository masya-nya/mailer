import { CSSProperties, FC } from 'react';
import cl from './AccountPage.module.scss';

interface AccountPageProps {
	className?: string;
	style?: CSSProperties;
}

export const AccountPage: FC<AccountPageProps> = () => {
	return (
		<div className={cl['account-page']}>

		</div>
	);
};
