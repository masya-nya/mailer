import React, { useState } from 'react';

type useDroppedWindowReturnType = [boolean, React.Dispatch<boolean>, Record<'x' | 'y' | 'right' | 'left' | 'bottom' | 'top', number>, (event:React.MouseEvent<HTMLDivElement>) => void]

export const useDroppedWindow = (targetClass: string):useDroppedWindowReturnType => {
	const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
	const [points, setPoints] = useState({
		x: 0,
		y: 0,
		right: 0,
		left: 0,
		bottom: 0,
		top: 0
	});

	const contextMenuHandler = (event: React.MouseEvent<HTMLDivElement>):void => {
		event.preventDefault();
		event.stopPropagation();
		const target = (event.target as HTMLElement).closest('.' + targetClass);
		if (target) {
			const { bottom, right, left, top } = target.getBoundingClientRect();
			setPoints({
				x: right - ((right - left) / 2),
				y: bottom,
				right,
				left,
				bottom,
				top
			});
			setIsContextMenuOpen(!isContextMenuOpen);
		}
	};

	return [isContextMenuOpen, setIsContextMenuOpen, points, contextMenuHandler];
};
