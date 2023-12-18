import React, { FC } from 'react';
import cl from './AccountSelectionitem.module.scss';
import { CSSProperties } from 'react';

type AccountSelectionitemProps = {
	name: string
	login: string
	className?: string
	style?: CSSProperties
}

export const AccountSelectionitem: FC<AccountSelectionitemProps> = ({ name, login, ...props }): React.JSX.Element => {
	return (
		<div {...props} className={cl['account-selection-item']}>
			{name}({login})
		</div>
	);
};