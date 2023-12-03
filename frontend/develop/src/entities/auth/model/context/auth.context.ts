import { createContext } from 'react';
import AuthStore from '../store';

interface AuthStoreI {
	store: AuthStore
}

const authStore = new AuthStore();

export const contextValue = { store: authStore };

export const AuthContext = createContext<AuthStoreI>(contextValue);