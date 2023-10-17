import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { NotificationT, NotificationTypesT } from '../../lib/types';
import { DURATIONS } from '../../lib/config';
import { ONE_SECOND } from '../../../../shared/lib/consts';

class NotificationsStore {
	private notifications:NotificationT[] = [];

	constructor () {
		makeAutoObservable(this);
	}

	private deleteNotification (id: string) {
		this.notifications = this.notifications.filter(notification => notification.id !== id);
	}

	public addNotification (title: string = 'ERROR', text: string | string[] = 'Случилась непредвиденная ошибка', type: NotificationTypesT) {
		const id = uuid();
		const newNotification:NotificationT = {
			id,
			title,
			text,
			type
		};
		setTimeout(() => {
			this.deleteNotification(id);
		}, (DURATIONS.slide_duration + DURATIONS.view_duration) * ONE_SECOND);
		this.notifications.push(newNotification);
	}

	get getNotifications () {
		return this.notifications;
	}
}

export const notificationsStore = new NotificationsStore();
