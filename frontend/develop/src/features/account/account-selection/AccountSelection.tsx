import React, { FC, useContext } from 'react';
import cl from './AccountSelection.module.scss';
import { CSSProperties } from 'react';
import { AuthContext } from 'src/entities/auth';
import { AccountSelectionitem } from './components/account-selection-item/AccountSelectionitem';
import { AccountPopulateI } from 'src/entities/account';

type AccountSelectionProps = {
	className?: string
	style?: CSSProperties
}

export const AccountSelection: FC<AccountSelectionProps> = ({ ...props }): React.JSX.Element => {
	const { store: authStore } = useContext(AuthContext);
	const accounts = (authStore.user?.accounts || []) as AccountPopulateI[];
	return (
		<div {...props} className={cl['account-selection']}>
			{
				accounts.map(({ name, login, _id }) =>
					(
						<AccountSelectionitem login={login} name={name} key={_id} />
					)
				)
			}
		</div>
	);
};