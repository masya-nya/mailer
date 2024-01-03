import { createContext } from 'react';
import { AccountRolesStore, accountRolesStore } from '../store/roles.store';

interface RolesStoreI {
	store: AccountRolesStore
}

export const rolesContextValue = { store: accountRolesStore };

export const RolesContext = createContext<RolesStoreI>(rolesContextValue);