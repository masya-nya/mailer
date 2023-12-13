import { FC, ReactNode } from 'react';
import { AuthContext } from '../..';
import { authContextValue } from '../context/auth.context';

type AuthProviderT = {
	children: ReactNode
}

export const AuthProvider:FC<AuthProviderT> = ({ children }) => {
	return (
		<AuthContext.Provider value={authContextValue}>
			{ children }
		</AuthContext.Provider>
	);
};