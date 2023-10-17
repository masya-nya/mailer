import React from 'react';
import cl from './FoldersCreate.module.scss';
import { observer } from 'mobx-react-lite';
import { foldersService, TypeFoldersActions, toSelectFormat, foldersStore, useFolders } from '../../../entities/folder';
import { useInput, useSelect, targetValueInOptions } from '../../../shared/lib';
import { Button } from '../../../shared/UI';
import FoldersCreateName from './components/folders-create-name/FoldersCreateName';
import FoldersCreateParent from './components/folders-create-parent/FoldersCreateParent';

const { CREATE_CHILD, EDIT } = TypeFoldersActions;

export const FoldersCreate = observer((): React.JSX.Element => {
	const { data: serverFolders, mutate: foldersMutate } = useFolders();
	const folderAsOptions = toSelectFormat(serverFolders || []);
	const [folderName, setFolderName] = useInput(foldersStore.actionType === CREATE_CHILD ? '' : foldersStore.focusedFolder.name);
	const [parentFolder, setParentFolder] = useSelect<string>(foldersStore.actionType === CREATE_CHILD ? targetValueInOptions(foldersStore.focusedFolder.path, folderAsOptions) : null);

	const emptyFolderNameCheck = ():boolean => !folderName.trim();

	const createFolder = async (event?: React.SyntheticEvent):Promise<void> => {
		const status = await foldersService.createFolder(folderName, parentFolder ? parentFolder.value : null, foldersStore.delimiter);
		if (status) {
			foldersStore.isCreateModalShowHandler(event!);
			foldersMutate();
		}
	};

	const editFolder = async (event?: React.SyntheticEvent):Promise<void> => {
		const status = await foldersService.updateFolder(folderName, foldersStore.focusedFolder.path, foldersStore.delimiter);
		if (status) {
			foldersStore.isCreateModalShowHandler(event!);
			foldersMutate();
		}
	};

	return (
		<div className={cl['folders-create']}>
			<FoldersCreateName folderName={folderName} setFolderName={setFolderName} emptyFolderNameCheck={emptyFolderNameCheck} />
			{
				foldersStore.actionType !== EDIT && <FoldersCreateParent parentFolder={parentFolder} setParentFolder={setParentFolder} folderAsOptions={folderAsOptions} />
			}
			<div className={cl['folders-create__btns']}>
				<Button disabled={emptyFolderNameCheck()} type='accent' clickHandler={foldersStore.actionType !== EDIT ? createFolder : editFolder}>{foldersStore.actionType !== EDIT ? 'Создать' : 'Сохранить'}</Button>
				<Button type='primary' clickHandler={(event?:React.SyntheticEvent) => foldersStore.isCreateModalShowHandler(event!)}>Отменить</Button>
			</div>
		</div>
	);
});