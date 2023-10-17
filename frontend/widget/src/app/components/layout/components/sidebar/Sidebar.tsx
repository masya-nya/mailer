import React from 'react';
import cl from './Sidebar.module.scss';
import { ROUTES_CONFIG, RoutesNamesT } from '../../config';
import SidebarItem from '../sidebar-item/SidebarItem';
import SidebarExit from '../sidebar-exit/SidebarExit';

type LayoutSidebarProp = {
	selectedRoute: string,
	setSelectedRoute: React.Dispatch<RoutesNamesT>
}

const Sidebar = ({ selectedRoute, setSelectedRoute }:LayoutSidebarProp):React.JSX.Element => {
	return (
		<div className={cl['sidebar']}>
			{
				Object.values(ROUTES_CONFIG).map(route =>
					<SidebarItem
						title={route.title}
						route={route.value}
						selectedRoute={selectedRoute}
						changeRouteHandler={setSelectedRoute}
						key={route.value}
					/>
				)
			}
			<SidebarExit />
		</div>
	);
};

export default Sidebar;