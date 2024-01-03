import { FC, ReactNode } from 'react';
import { NotificationContext, notificationContextValue } from '../context/NotificationContext';

type NotificationProviderT = {
	children: ReactNode
}

export const NotificationProvider:FC<NotificationProviderT> = ({ children }) => {
	return (
		<NotificationContext.Provider value={notificationContextValue}>
			{ children }
		</NotificationContext.Provider>
	);
};