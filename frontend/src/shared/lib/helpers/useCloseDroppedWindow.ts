import React, { useEffect } from 'react';

export const useCloseDroppedWindow = (
	rootRef: React.RefObject<HTMLDivElement | HTMLButtonElement>,
	stateHandler: React.Dispatch<boolean>
):void => {
	useEffect(() => {
		const closeSelect = (e: MouseEvent):void => {
			const target = e.target as HTMLElement;
			const ref = rootRef.current as HTMLElement;
			const isClickOutsideTheArea = !(ref.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_CONTAINED_BY);
			isClickOutsideTheArea && stateHandler(false);
		};
		document.addEventListener('click', closeSelect);

		return () => document.removeEventListener('click', closeSelect);
	}, [rootRef]);
};