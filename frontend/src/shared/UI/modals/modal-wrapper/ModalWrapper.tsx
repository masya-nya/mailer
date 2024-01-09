import React, { FC, useContext } from 'react';
import cl from './ModalWrapper.module.scss';
import { observer } from 'mobx-react-lite';
import { ModalContext } from 'src/entities/modal';

type ModalWrapperProps = {
	// children: React.ReactNode
	// modalHandler: (event: React.SyntheticEvent) => void
};

export const ModalWrapper: FC<ModalWrapperProps> = observer(
	(): React.JSX.Element => {
		const { store: modalStore } = useContext(ModalContext);

		const modalHandler = (event: React.SyntheticEvent):void => {
			event.stopPropagation();
			modalStore.isOpen = false;
		};

		return (
			<>
				{modalStore.isOpen && (
					<div
						className={cl['modal-wrapper']}
						onMouseDown={(event: React.SyntheticEvent) =>
							modalHandler(event)
						}
					>
						<div
							className={cl['modal-wrapper__container']}
							onMouseDown={event => event.stopPropagation()}
						>
							{modalStore.children}
						</div>
					</div>
				)}
			</>
		);
	}
);
