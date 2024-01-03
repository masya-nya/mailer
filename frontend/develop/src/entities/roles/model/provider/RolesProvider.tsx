import { FC, ReactNode } from 'react';
import { RolesContext, rolesContextValue } from '../context/RolesContext';

type RolesProviderT = {
	children: ReactNode
}

export const RolesProvider:FC<RolesProviderT> = ({ children }) => {
	return (
		<RolesContext.Provider value={rolesContextValue}>
			{ children }
		</RolesContext.Provider>
	);
};