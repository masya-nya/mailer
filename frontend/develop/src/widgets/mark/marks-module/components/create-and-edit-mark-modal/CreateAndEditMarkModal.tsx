import React from 'react';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react-lite';
import { CreateAndEditMark } from '../../../create-mark';
import { marksStore } from '../../../../../entities/mark';
import { ModalWrapper } from '../../../../../shared/UI';

export const CreateAndEditMarkModal = observer((): React.JSX.Element => {
	return (
		<>
			{
				marksStore.isCreateModalShow && createPortal(
					<ModalWrapper modalHandler={() => marksStore.isCreateModalShowHandler()}>
						<CreateAndEditMark />
					</ModalWrapper>
					, document.body)
			}
		</>
	);
});