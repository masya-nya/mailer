import { FC, PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';
import { ROUTER_ROTES } from '../config';
import { SELECTED_ACCOUNT_ID_LS_KEY } from 'src/entities/account';
import { AccountContext } from 'src/entities/account/model/context/AccountContext';
const { ACCOUNT_SELECTION } = ROUTER_ROTES;

export const NoAccountSelected:FC<PropsWithChildren> = ({ children }) => {
	console.log('NoAccountSelected');
	const { store: authStore } = useContext(AuthContext);
	const { store: accountStore } = useContext(AccountContext);
	const accounts = authStore.accounts;
	const selectedAccountId = localStorage.getItem(SELECTED_ACCOUNT_ID_LS_KEY);
	const relevantAccount = accounts.find(account => account._id === selectedAccountId);

	if (!selectedAccountId || !relevantAccount) {
		console.log(`NAVIGATE TO ${ACCOUNT_SELECTION}`);
		localStorage.removeItem(SELECTED_ACCOUNT_ID_LS_KEY);
		return <Navigate to={ACCOUNT_SELECTION} />;
	}
	accountStore.accountId = relevantAccount._id;
	return <>{ children }</>;
};