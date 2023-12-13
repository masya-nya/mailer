import { createContext } from 'react';
import { AuthStore, authStore } from '../store';

interface AuthStoreI {
	store: AuthStore
}

export const authContextValue = { store: authStore };

export const AuthContext = createContext<AuthStoreI>(authContextValue);