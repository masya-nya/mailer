import React from 'react';
import cl from './NotificationsWrapper.module.scss';
import { observer } from 'mobx-react-lite';
import { notificationsStore } from '../../entities/notification';
import Notification from './components/notification/Notification';

export const NotificationsWrapper = observer((): React.JSX.Element => {
	return (
		<>
			{
				Boolean(notificationsStore.getNotifications.length) &&
				<div className={cl['notifications-wrapper']}>
					{
						notificationsStore.getNotifications.map(notification => <Notification type={notification.type} title={notification.title} text={notification.text} key={notification.id} />)
					}
				</div>
			}
		</>
	);
});
