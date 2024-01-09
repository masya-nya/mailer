import { FC, ReactNode } from 'react';
import { AccountUserContext, accountUserContextValue } from '../context/AccountUserContext';

type AccountUserProviderT = {
	children: ReactNode
}

export const AccountUserProvider:FC<AccountUserProviderT> = ({ children }) => {
	return (
		<AccountUserContext.Provider value={accountUserContextValue}>
			{ children }
		</AccountUserContext.Provider>
	);
};