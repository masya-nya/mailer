import React from 'react';
import cl from './SettingsContent.module.scss';
import { SETTINGS_PAGE_CONF, SettingsRoutesT } from '../../lib/config';

type SettingsContentProps = {
	selectedRoute: SettingsRoutesT
}

const SettingsContent = ({ selectedRoute }:SettingsContentProps):React.JSX.Element => {
	return (
		<div className={cl['settings-content']}>
			{ SETTINGS_PAGE_CONF[selectedRoute].Component }
		</div>
	);
};

export default SettingsContent;
