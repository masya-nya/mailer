import React, { FC, useContext } from 'react';
import cl from './AccountSelection.module.scss';
import { CSSProperties } from 'react';
import { AuthContext } from 'src/entities/auth';
import { AccountSelectionitem } from './components/account-selection-item/AccountSelectionitem';
import { observer } from 'mobx-react-lite';
import { AccountContext, SELECTED_ACCOUNT_ID_LS_KEY } from 'src/entities/account';
import { useNavigate } from 'react-router-dom';
import { ROUTER_ROTES } from 'src/app/router/config';
const { LAYOUT: { BASE } } = ROUTER_ROTES;

type AccountSelectionProps = {
	className?: string
	style?: CSSProperties
}

export const AccountSelection: FC<AccountSelectionProps> = observer(({ ...props }): React.JSX.Element => {
	const { store: authStore } = useContext(AuthContext);
	const { store: accountStore } = useContext(AccountContext);
	const navigate = useNavigate();
	const accounts = authStore.accounts;

	const selectAccount = (_id: string):void => {
		localStorage.setItem(SELECTED_ACCOUNT_ID_LS_KEY, _id);
		accountStore.accountId = _id;
		navigate(BASE);
	};

	return (
		<div {...props} className={cl['account-selection']}>
			{
				accounts.map(({ name, login, _id }) =>
					(
						<AccountSelectionitem login={login} name={name} clickHandler={() => selectAccount(_id)} key={_id} />
					)
				)
			}
		</div>
	);
});