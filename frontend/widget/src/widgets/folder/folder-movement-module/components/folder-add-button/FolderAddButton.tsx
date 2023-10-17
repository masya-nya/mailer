import React from 'react';
import cl from './FolderAddButton.module.scss';
import { TypeFoldersActions, foldersStore } from '../../../../../entities/folder';
const { CREATE_CLEAR } = TypeFoldersActions;

type FolderAddButtonProps = {
	setIsDroppedWindowOpen: React.Dispatch<boolean>
}

const FolderAddButton = ({ setIsDroppedWindowOpen }:FolderAddButtonProps):React.JSX.Element => {
	const configurateClearCreateActionHandler = (event: React.SyntheticEvent):void => {
		foldersStore.actionType = CREATE_CLEAR;
		foldersStore.isCreateModalShowHandler(event);
		setIsDroppedWindowOpen(false);
	};

	return (
		<div onClick={(event) => configurateClearCreateActionHandler(event)} className={cl['folder-add-button']}>
			<div className={cl['folder-add-button__inner']}>
				Новая папка
			</div>
		</div>
	);
};

export default FolderAddButton;