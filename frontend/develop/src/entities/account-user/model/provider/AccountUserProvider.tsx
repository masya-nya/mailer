import { FC, ReactNode } from 'react';
import { AccountUserContext, accountUserContextValue } from '../context/AccountUserContext';

type AccountProviderT = {
	children: ReactNode
}

export const AccountProvider:FC<AccountProviderT> = ({ children }) => {
	return (
		<AccountUserContext.Provider value={accountUserContextValue}>
			{ children }
		</AccountUserContext.Provider>
	);
};