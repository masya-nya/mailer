import React from 'react';
import cl from './SettingsNavigationItem.module.scss';
import { SettingsRoutesT } from '../../lib/config';
import cn from 'classnames';

type SettingsNavigationItemProps = {
	title: string
	value: SettingsRoutesT
	selectedRoute: SettingsRoutesT
	setSelectedRoute: React.Dispatch<SettingsRoutesT>
}

const SettingsNavigationItem = ({ title, value, selectedRoute, setSelectedRoute }:SettingsNavigationItemProps):React.JSX.Element => {
	return (
		<div
			onClick={() => setSelectedRoute(value)}
			className={cn(
				cl['settings-navigation-item'],
				{
					[cl['settings-navigation-item--active']]: value === selectedRoute
				}
			)}
		>
			<div className={cl['settings-navigation-item__inner']}>
				{ title }
			</div>
		</div>
	);
};

export default SettingsNavigationItem;
