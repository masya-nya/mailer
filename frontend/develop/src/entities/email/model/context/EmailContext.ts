import { createContext } from 'react';
import { EmailStore, emailStore } from '../store/email.store';

interface EmailStoreI {
	store: EmailStore
}

export const emailContextValue = { store: emailStore };

export const EmailContext = createContext<EmailStoreI>(emailContextValue);