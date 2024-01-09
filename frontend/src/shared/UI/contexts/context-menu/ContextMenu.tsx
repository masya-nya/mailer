import React from 'react';
import cl from './ContextMenu.module.scss';
import { ContextMenuConfigurationT } from './context-menu.type';
import { ContextMenuItem } from '../context-menu-item/ContextMenuItem';

type ContextMenuProps = {
	menuOptions: ContextMenuConfigurationT[]
}

export const ContextMenu = ({ menuOptions }:ContextMenuProps):React.JSX.Element => {
	return (
		<div className={cl['context-menu']}>
			{
				menuOptions.map(option => <ContextMenuItem title={option.title} type={option.type} onClickHandler={option.handler} key={option.title} />)
			}
		</div>
	);
};
