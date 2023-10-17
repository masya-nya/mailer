import React from 'react';
import cl from './ModalWrapper.module.scss';

type ModalWrapperProps = {
	children: React.ReactNode
	modalHandler: (event: React.SyntheticEvent) => void
}

export const ModalWrapper = ({ children, modalHandler }:ModalWrapperProps):React.JSX.Element => {
	return (
		<div className={cl['modal-wrapper']} onMouseDown={(event: React.SyntheticEvent) => modalHandler(event)}>
			<div className={cl['modal-wrapper__container']} onMouseDown={(event) => event.stopPropagation()}>
				{ children }
			</div>
		</div>
	);
};
