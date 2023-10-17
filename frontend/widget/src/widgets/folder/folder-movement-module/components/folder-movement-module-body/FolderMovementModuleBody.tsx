import React, { useState } from 'react';
import cl from './FolderMovementModuleBody.module.scss';
import FolderListColumn from '../folders-list-column/FolderListColumn';
import FolderAddButton from '../folder-add-button/FolderAddButton';
import { foldersToArray, useFolders } from '../../../../../entities/folder';
import { SelectedMailT } from '../../../../../entities/mails-list';
import { Input } from '../../../../../shared/UI';

type FolderMovementModuleBodyProps = {
	setIsDroppedWindowOpen: React.Dispatch<boolean>
	selectedMails: SelectedMailT[]
}

const FolderMovementModuleBody = ({ setIsDroppedWindowOpen, selectedMails }:FolderMovementModuleBodyProps):React.JSX.Element => {
	const [searchValue, setSearchValue] = useState<string>('');
	const { data: folders } = useFolders();
	const listOfFolders = foldersToArray(folders || []);

	const filteredFolders = (listOfFolders || []).filter(folder => folder.name.toLowerCase().includes(searchValue.toLowerCase()));

	const setSearchFolderHandler = (event: React.ChangeEvent<HTMLInputElement>):void => {
		setSearchValue(event.target.value);
	};
	return (
		<div className={cl['folder-change-body']}>
			<div className={cl['folder-change-body__search']}>
				<Input type='text' defaultValue={searchValue} onChangeHandler={setSearchFolderHandler} placeholder='Поиск папки' style={{ width: '100%', fontSize: '14px' }} />
			</div>
			<FolderListColumn folders={filteredFolders || []} setIsDroppedWindowOpen={setIsDroppedWindowOpen} selectedMails={selectedMails} />
			<FolderAddButton setIsDroppedWindowOpen={setIsDroppedWindowOpen} />
		</div>
	);
};

export default FolderMovementModuleBody;
