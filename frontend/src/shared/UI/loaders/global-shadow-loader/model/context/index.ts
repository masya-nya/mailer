import { createContext } from 'react';
import { globalShadowLoaderStore, GlobalShadowLoaderStore } from '../store';

interface GlobalShadowLoaderI {
	store: GlobalShadowLoaderStore
}

export const globalShadowLoaderContextValue = { store: globalShadowLoaderStore };

export const GlobalShadowLoaderContext = createContext<GlobalShadowLoaderI>(globalShadowLoaderContextValue);