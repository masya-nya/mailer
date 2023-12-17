import { createContext } from 'react';
import { AccountStore, accountStore } from '../store/account.store';

interface AccountStoreI {
	store: AccountStore
}

export const accountContextValue = { store: accountStore };

export const AccountContext = createContext<AccountStoreI>(accountContextValue);