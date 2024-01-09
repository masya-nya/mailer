import { NavlinkI } from 'src/shared/UI/navlinks';
import { ROUTER_ROTES } from 'src/app/router/config';
const { LAYOUT: { BASE, SETTINGS } } = ROUTER_ROTES;

interface SidebarGroupI {
	title: string
	links: NavlinkI[]
}

export const SidebarNavigationGroups: SidebarGroupI[]  = [
	{
		title: 'Навигация',
		links: [
			{
				to: BASE,
				title: 'Домашняя страница'
			},
			{
				to: SETTINGS,
				title: 'Настройки'
			}
		]
	}
];