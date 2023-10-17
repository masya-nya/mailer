export type ManagerT = {
	active: boolean
	amo_profile_id: string | null
	amojo_id: string
	avatar: string
	free_user: string
	group: string
	id: string
	is_admin: string
	login: string
	option: string
	status: string
	theme: number
	title: string
}
export type ManagerWithGroupNameT = {
	active: boolean
	amo_profile_id: string | null
	amojo_id: string
	avatar: string
	free_user: string
	group: string
	id: string
	is_admin: string
	login: string
	option: string
	status: string
	theme: number
	title: string
	group_name: string
}
export const IS_ADMIN = APP.constant('user_rights').is_admin;
export const ACCOUNT:any = APP.constant('account')
export const USER:any = APP.constant('user')
export const MANAGERS:any = APP.constant('managers')
export const GROUPS:Record<string, string> = APP.constant('groups')
export const ACCOUNT_ID:number = ACCOUNT.id;
export const USER_ID:number = USER.id;