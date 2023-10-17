export type NotificationTypesT = 'primary' | 'danger' | 'warning'

export type NotificationT = {
	id: string,
	title: string,
	text: string | string[],
	type: NotificationTypesT
}