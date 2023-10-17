import React from 'react';
import cl from './SidebarItem.module.scss';
import cn from 'classnames';
import { RoutesNamesT } from '../../config';

type LayoutSidebarItemProp = {
	title: string,
	route: RoutesNamesT,
	selectedRoute: string,
	changeRouteHandler: React.Dispatch<RoutesNamesT>
}

const SidebarItem = ({ title, route, selectedRoute, changeRouteHandler }:LayoutSidebarItemProp):React.JSX.Element => {
	return (
		<div
			onClick={() => changeRouteHandler(route)}
			className={
				cn(
					cl['sidebar__item'],
					{ [cl['sidebar__item--active']]: route === selectedRoute }
				)
			}
			route-id={route}>
			<span className={cl['sidebar__item-inner']}>
				{ title }
			</span>
		</div>
	);
};

export default SidebarItem;
