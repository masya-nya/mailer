import React from 'react';
import cl from './SettingsNavigation.module.scss';
import { SETTINGS_PAGE_CONF, SettingsRoutesT } from '../../lib/config';
import SettingsNavigationItem from '../settings-navigation-item/SettingsNavigationItem';

type SettingsNavigationProps = {
	selectedRoute: SettingsRoutesT
	setSelectedRoute: React.Dispatch<SettingsRoutesT>
}

const SettingsNavigation = ({ selectedRoute, setSelectedRoute }:SettingsNavigationProps):React.JSX.Element => {
	return (
		<div className={cl['settings-navigation']}>
			{
				Object.values(SETTINGS_PAGE_CONF).map(route =>
					<SettingsNavigationItem
						title={route.title}
						value={route.value}
						selectedRoute={selectedRoute}
						setSelectedRoute={setSelectedRoute}
						key={route.value}
					/>
				)
			}
		</div>
	);
};

export default SettingsNavigation;
