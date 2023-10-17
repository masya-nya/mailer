import React from 'react';
import cl from './Folder.module.scss';
import { foldersService, useFolders, TypeFoldersActions, FolderType, foldersStore } from '../../../../../entities/folder';
import { ContextMenuWrapper, ContextMenu } from '../../../../../shared/UI';
import { useToggle, useContextMenu } from '../../../../../shared/lib';
import FolderChildren from '../folder-children/FolderChildren';
import FolderHeading from '../folder-heading/FolderHeading';
import { createPortal } from 'react-dom';
const { CREATE_CHILD, EDIT } = TypeFoldersActions;

type FolderProps = {
	folder: FolderType
};

const Folder = ({ folder }: FolderProps): React.JSX.Element => {
	const { mutate: foldersMutate } = useFolders();
	const [isChildrenOpen, isChildrenOpenHandler] = useToggle();
	const [isContextMenuOpen, setIsContextMenuOpen, points, contextMenuHandler] = useContextMenu();

	const deleteFolder = async (): Promise<void> => {
		const status = await foldersService.deleteFolder(folder.path);
		setIsContextMenuOpen(false);
		status && foldersMutate();
	};

	const configurateEditActionHandler = (): void => {
		foldersStore.actionType = EDIT;
		foldersStore.changeFocusedFolder(folder);
		setIsContextMenuOpen(false);
		foldersStore.isCreateModalShowHandler();
	};

	const configurateCreateActionHandler = (): void => {
		foldersStore.actionType = CREATE_CHILD;
		foldersStore.changeFocusedFolder(folder);
		setIsContextMenuOpen(false);
		foldersStore.isCreateModalShowHandler();
	};

	return (
		<div className={cl['folder']}>
			<FolderHeading onContextMenuHandler={contextMenuHandler} folder={folder} isChildrenOpenHandler={isChildrenOpenHandler} isChildrenOpen={isChildrenOpen} />
			{isChildrenOpen && 'folders' in folder && <FolderChildren folderChildren={folder.folders!} />}
			{
				isContextMenuOpen &&
				createPortal(
					<ContextMenuWrapper isMenuOpenHandler={setIsContextMenuOpen} top={points.y} left={points.x}>
						<ContextMenu menuOptions={[
							{
								title: 'Создать',
								handler: configurateCreateActionHandler
							},
							{
								title: 'Переименовать',
								handler: configurateEditActionHandler
							},
							{
								title: 'Удалить',
								handler: deleteFolder,
								type: 'danger'
							}
						]}
						/>
					</ContextMenuWrapper>
					, document.body)
			}
		</div>
	);
};

export default Folder;
