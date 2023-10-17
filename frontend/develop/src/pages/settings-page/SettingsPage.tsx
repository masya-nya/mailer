import React, { useState } from 'react';
import cl from './SettingsPage.module.scss';
import SettingsNavigation from './components/settings-navigation/SettingsNavigation';
import SettingsContent from './components/settings-content/SettingsContent';
import { SettingsRoutes, SettingsRoutesT } from './lib/config';

export const SettingsPage = ():React.JSX.Element => {
	const [selectedRoute, setSelectedRoute] = useState<SettingsRoutesT>(SettingsRoutes.templates);

	return (
		<div className={cl['settings-page']}>
			<SettingsNavigation selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
			<SettingsContent selectedRoute={selectedRoute} />
		</div>
	);
};
