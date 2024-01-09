import { FC, ReactNode } from 'react';
import { ModalContext, modalContextValue } from '../context/ModalContext';

type ModalProviderT = {
	children: ReactNode
}

export const ModalProvider:FC<ModalProviderT> = ({ children }) => {
	return (
		<ModalContext.Provider value={modalContextValue}>
			{ children }
		</ModalContext.Provider>
	);
};