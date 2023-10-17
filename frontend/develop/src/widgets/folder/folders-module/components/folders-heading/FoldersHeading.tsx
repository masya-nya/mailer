import React from 'react';
import cl from './FoldersHeading.module.scss';
import { observer } from 'mobx-react-lite';
import { createPortal } from 'react-dom';
import { TypeFoldersActions, foldersStore } from '../../../../../entities/folder';
import { Plus, ModalWrapper } from '../../../../../shared/UI';
import { COLORS } from '../../../../../shared/lib';
import { FolderSvg } from '../../../../../shared/svg';
import { FoldersCreate } from '../../../folders-create';
const { CREATE_CLEAR } = TypeFoldersActions;

type FoldersHeadingProps = {
	isFoldersViewHandler: (event: React.SyntheticEvent) => void
}

const FoldersHeading = observer(({ isFoldersViewHandler }: FoldersHeadingProps): React.JSX.Element => {
	const configurateClearCreateActionHandler = (event: React.SyntheticEvent):void => {
		foldersStore.actionType = CREATE_CLEAR;
		foldersStore.isCreateModalShowHandler(event);
	};

	return (
		<>
			<div onClick={(event) => isFoldersViewHandler(event)} className={cl['folders-heading']}>
				<div className={cl['folders-heading__left']}>
					<FolderSvg width='20' height='20' color={COLORS.font_base_color} />
					<div className={cl['folders-heading__text']}>
						Мои папки
					</div>
				</div>
				<Plus onClickHandler={(event?:React.SyntheticEvent) => configurateClearCreateActionHandler(event!)} />
			</div>
			{
				foldersStore.isCreateModalShow && createPortal(
					<ModalWrapper modalHandler={(event: React.SyntheticEvent) => foldersStore.isCreateModalShowHandler(event)}>
						<FoldersCreate />
					</ModalWrapper>
					, document.body)
			}
		</>
	);
});

export default FoldersHeading;
