import { createContext } from 'react';
import { ModalStore, modalStore } from '../store/modal.store';

interface ModalStoreI {
	store: ModalStore
}

export const modalContextValue = { store: modalStore };

export const ModalContext = createContext<ModalStoreI>(modalContextValue);