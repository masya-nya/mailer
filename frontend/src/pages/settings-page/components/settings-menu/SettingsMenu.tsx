import React from 'react';
import cl from './SettingsMenu.module.scss';
import { CSSProperties } from 'react';

type SettingsMenuProps = {
	className?: string
	style?: CSSProperties
}

export const SettingsMenu = ({ ...props }: SettingsMenuProps): React.JSX.Element => {
	return (
		<div {...props} className={cl['settings-menu']}>
			
		</div>
	);
};