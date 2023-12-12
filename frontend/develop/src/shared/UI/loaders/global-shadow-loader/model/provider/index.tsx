import { FC, ReactNode } from 'react';
import { GlobalShadowLoaderContext, globalShadowLoaderContextValue } from '../context';

type GlobalShadowLoaderProviderT = {
	children: ReactNode
}

export const GlobalShadowLoaderProvider:FC<GlobalShadowLoaderProviderT> = ({ children }) => {
	return (
		<GlobalShadowLoaderContext.Provider value={globalShadowLoaderContextValue}>
			{ children }
		</GlobalShadowLoaderContext.Provider>
	);
};