import React, { FC } from 'react';
import cl from './AccountSelectionitem.module.scss';
import { CSSProperties } from 'react';

type AccountSelectionitemProps = {
	name: string
	login: string
	clickHandler: () => void
	className?: string
	style?: CSSProperties
}

export const AccountSelectionitem: FC<AccountSelectionitemProps> = ({ name, login, clickHandler, ...props }): React.JSX.Element => {
	return (
		<div {...props} onClick={clickHandler} className={cl['account-selection-item']}>
			{name} ({login})
		</div>
	);
};