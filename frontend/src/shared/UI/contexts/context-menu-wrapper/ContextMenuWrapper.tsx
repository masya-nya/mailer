import React, { useEffect, useRef } from 'react';
import cl from './ContextMenuWrapper.module.scss';

type ContextMenuWrapperProps = {
	top: number,
	left: number,
	children: React.ReactNode,
	isMenuOpenHandler: React.Dispatch<boolean>
}

export const ContextMenuWrapper = ({ top, left, children, isMenuOpenHandler }: ContextMenuWrapperProps): React.JSX.Element => {
	const menuRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		menuRef.current && menuRef.current.focus();
	}, []);

	return (
		<div
			tabIndex={0}
			ref={menuRef}
			style={{ top: `${top}px`, left: `${left}px` }}
			onClick={(event) => event.stopPropagation()}
			onBlur={() => isMenuOpenHandler(false)}
			className={cl['context-menu-wrapper']}
		>
			{children}
		</div>
	);
};