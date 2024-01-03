import React, { useEffect, useState } from 'react';

type UseDroppedWindowInpuMultiReturnType = [boolean, React.Dispatch<boolean>, Record<'x' | 'y' | 'right' | 'left' | 'bottom' | 'top', number>, (event:React.MouseEvent<HTMLDivElement>) => void]

export const useDroppedWindowInpuMulti = (targetClass: string):UseDroppedWindowInpuMultiReturnType => {
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

export const useCloseInputMultiModalWindow = (
	rootRef: React.RefObject<HTMLDivElement | HTMLButtonElement>,
	stateHandler: React.Dispatch<boolean>
):void => {
	useEffect(() => {
		// if (rootRef.current) {
		const closeSelect = (e: MouseEvent):void => {
			const target = e.target as HTMLElement;
			const ref = rootRef.current as HTMLElement;
			const isClickOutsideTheArea = !(ref.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_CONTAINED_BY);
			isClickOutsideTheArea && stateHandler(false);
		};
		document.addEventListener('click', closeSelect);
		return () => document.removeEventListener('click', closeSelect);
		// }
	}, [rootRef]);
};