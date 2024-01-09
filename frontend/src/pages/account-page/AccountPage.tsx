import { CSSProperties, FC } from 'react';
import cl from './AccountPage.module.scss';
import { CreateAccountForm } from 'src/features/account';

interface AccountPageProps {
	className?: string;
	style?: CSSProperties;
}

export const AccountPage: FC<AccountPageProps> = () => {
	return (
		<div className={cl['account-page']}>
			<CreateAccountForm />
		</div>
	);
};
