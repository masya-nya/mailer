import { CSSProperties, FC } from 'react';
import cl from './AccountSelectionPage.module.scss';
import { AccountSelection } from 'src/features/account';

interface AccountSelectionPageProps {
	className?: string
	style?: CSSProperties
}

export const AccountSelectionPage:FC<AccountSelectionPageProps> = () => {
	return (
		<div className={cl['account-selection-page']}>
			<AccountSelection />
		</div>
	);
};