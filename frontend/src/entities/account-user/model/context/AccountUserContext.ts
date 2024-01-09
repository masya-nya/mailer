import { createContext } from 'react';
import { AccountUserStore, accountUserStore } from '../store/account-user.store';

interface AccountUserStoreI {
	store: AccountUserStore
}

export const accountUserContextValue = { store: accountUserStore };

export const AccountUserContext = createContext<AccountUserStoreI>(accountUserContextValue);