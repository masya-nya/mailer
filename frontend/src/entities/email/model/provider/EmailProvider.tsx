import { FC, ReactNode } from 'react';
import { EmailContext, emailContextValue } from '../context/EmailContext';

type EmailProviderT = {
	children: ReactNode
}

export const EmailProvider:FC<EmailProviderT> = ({ children }) => {
	return (
		<EmailContext.Provider value={emailContextValue}>
			{ children }
		</EmailContext.Provider>
	);
};