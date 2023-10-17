import React, { useState } from 'react';

type useContextMenuReturnType = [boolean, React.Dispatch<boolean>, Record<'x' | 'y', number>, (event:React.MouseEvent<HTMLDivElement>) => void]

export const useContextMenu = ():useContextMenuReturnType => {
	const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
	const [points, setPoints] = useState({
		x: 0,
		y: 0
	});

	const contextMenuHandler = (event: React.MouseEvent<HTMLDivElement>):void => {
		event.preventDefault();
		setPoints({
			x: event.clientX,
			y: event.clientY
		});
		setIsContextMenuOpen(true);
	};

	return [isContextMenuOpen, setIsContextMenuOpen, points, contextMenuHandler];
};
