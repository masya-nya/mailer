export const RolesRights = [
	'can_send',
	'can_add_email',
	'can_view_msg',
	'can_move_msg',
	'can_add_users',
	'can_read_unread',
] as const;

export type RolesRightsT = (typeof RolesRights)[number];

export const RolesRightsTranslate: Record<RolesRightsT, string> = {
	can_send: 'Может отправлять сообщения',
	can_add_email: 'Может добавлять постовые ящики',
	can_view_msg: 'Может просматривать сообщения',
	can_move_msg: 'Может перемещать сообщения',
	can_add_users: 'Может добавлять пользователей',
	can_read_unread: 'Может менять статус прочитано/непрочитано',
};
