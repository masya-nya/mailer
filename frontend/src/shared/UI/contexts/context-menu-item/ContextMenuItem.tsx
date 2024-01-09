import React from 'react';
import cl from './ContextMenuItem.module.scss';
import { ContextMenuItemTypeT } from './context-menu-item.type';
import cn from 'classnames';

type ContextMenuItemProps = {
	title: string,
	onClickHandler: (event: React.SyntheticEvent) => void,
	children?: React.ReactNode
	style?: React.CSSProperties
	type?: ContextMenuItemTypeT
}

export const ContextMenuItem = ({ title, onClickHandler, style, children, type }:ContextMenuItemProps):React.JSX.Element => {
	return (
		<div style={style} className={cn(cl['context-menu-item'], { [cl[`context-menu-item--${type}`]]: type })} onClick={(event) => onClickHandler(event)}>
			{ children }
			<div className={cl['context-menu-item__inner']}>
				{ title }
			</div>
		</div>
	);
};
