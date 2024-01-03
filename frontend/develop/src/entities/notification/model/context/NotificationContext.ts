import { createContext } from 'react';
import { NotificationsStore, notificationsStore } from '../store/notification.store';

interface NotificationStoreI {
	store: NotificationsStore
}

export const notificationContextValue = { store: notificationsStore };

export const NotificationContext = createContext<NotificationStoreI>(notificationContextValue);