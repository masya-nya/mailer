import React, { FC } from 'react';
import cl from './RolesSettings.module.scss';
import { CSSProperties } from 'react';

type RolesSettingsProps = {
	className?: string
	style?: CSSProperties
}

export const RolesSettings: FC<RolesSettingsProps> = ({ ...props }): React.JSX.Element => {
	return (
		<div {...props}  className={cl['']}>
			
		</div>
	);
};