import { NavlinkI } from 'src/shared/UI/navlinks';
import { ROUTER_ROTES } from 'src/app/router/config';
const { LAYOUT: { BASE, SETTINGS }, ACCOUNT } = ROUTER_ROTES;

interface SidebarGroupI {
	title: string
	links: NavlinkI[]
}

export const SidebarNavigationGroup: SidebarGroupI  = {
	title: 'Навигация',
	links: [
		{
			to: BASE,
			title: 'Домашняя страница'
		},
		{
			to: SETTINGS,
			title: 'Настройки'
		},
		{
			to: ACCOUNT,
			title: 'Создание аккаунта'
		}
	]
};