import { FC, ReactNode } from 'react';
import { AccountContext, accountContextValue } from '../context/AccountContext';

type AccountProviderT = {
	children: ReactNode
}

export const AccountProvider:FC<AccountProviderT> = ({ children }) => {
	return (
		<AccountContext.Provider value={accountContextValue}>
			{ children }
		</AccountContext.Provider>
	);
};