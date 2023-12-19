import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';
import { ROUTER_ROTES } from '../config';
import { SELECTED_ACCOUNT_ID_LS_KEY } from 'src/entities/account';
import { AccountContext } from 'src/entities/account/model/context/AccountContext';
const { LAYOUT: { ACCOUNT_SELECTION } } = ROUTER_ROTES;

interface NoAccountSelectedI {
	children: React.ReactNode
}

export const NoAccountSelected:FC<NoAccountSelectedI> = ({ children }) => {
	console.log('NoAccountSelected');
	const { store: authStore } = useContext(AuthContext);
	const { store: accountStore } = useContext(AccountContext);
	const accounts = authStore.accounts;
	const selectedAccount = localStorage.getItem(SELECTED_ACCOUNT_ID_LS_KEY);

	const relevantAccount = accounts.find(account => account._id === selectedAccount);

	if (!relevantAccount) {
		localStorage.removeItem(SELECTED_ACCOUNT_ID_LS_KEY);
	} else {
		accountStore.accountId = relevantAccount._id;
	}

	// if (accounts.length === 1) {

	// }

	if (!Boolean(accounts.length) || !selectedAccount) {
		console.log(`NAVIGATE TO ${ACCOUNT_SELECTION}`);
		return <Navigate to={ACCOUNT_SELECTION} />;
	}

	return children;
};