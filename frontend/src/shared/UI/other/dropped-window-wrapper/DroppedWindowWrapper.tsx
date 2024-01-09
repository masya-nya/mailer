import React, { useRef } from 'react';
import cl from './DroppedWindowWrapper.module.scss';
import { useCloseDroppedWindow } from '../../../lib/helpers';

type DroppedWindowWrapperProps = {
	top?: number,
	left?: number,
	right?: number,
	bottom?: number
	width: number
	children: React.ReactNode,
	isMenuOpenHandler: React.Dispatch<boolean>
}

export const DroppedWindowWrapper = ({ top, left, right, bottom, width, children, isMenuOpenHandler }:DroppedWindowWrapperProps):React.JSX.Element => {
	const menuRef = useRef(null);
	useCloseDroppedWindow(menuRef, isMenuOpenHandler);

	return (
		<div ref={menuRef} style={{ width: `${width}px`, top: `${top}px`, right: `${right}px`, bottom: `${bottom}px`, left: `${left}px` }} className={cl['dropped-window-wrapper']}>
			{ children }
		</div>
	);
};