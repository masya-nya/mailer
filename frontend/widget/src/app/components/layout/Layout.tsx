import React, { useState } from 'react';
import cl from './Layout.module.scss';
import { RoutesNamesT, ROUTES_NAMES, ROUTES_CONFIG } from './config';
import { NotificationsWrapper } from '../../../widgets/notification';
import { createPortal } from 'react-dom';
import { Logo } from '../../../shared/UI';
import Sidebar from './components/sidebar/Sidebar';

export const Layout = ():React.JSX.Element => {
	const [selectedRoute, setSelectedRoute] = useState<RoutesNamesT>(ROUTES_NAMES.personal);

	return (
		<div className={cl['app']}>
			<div className={cl['app__sidebar']}>
				<div className={cl['app__logo']}>
					<Logo />
				</div>
				<Sidebar selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
			</div>
			<div className={cl['app__content']}>
				{
					ROUTES_CONFIG[selectedRoute].Component
				}
			</div>
			{
				createPortal(<NotificationsWrapper />, document.body)
			}
		</div>
	);
};
