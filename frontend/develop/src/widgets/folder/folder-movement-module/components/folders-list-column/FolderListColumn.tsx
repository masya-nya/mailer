import React from 'react';
import cl from './FolderListColumn.module.scss';
import { FolderType } from '../../../../../entities/folder';
import { MAIL_TYPES_CONF } from '../../../../../entities/mail-boxes';
import { SelectedMailT } from '../../../../../entities/mails-list';
import FoldersListColumnItem from '../folders-list-column-item/FoldersListColumnItem';

type FolderListColumnProps = {
	folders: FolderType[]
	setIsDroppedWindowOpen: React.Dispatch<boolean>
	selectedMails: SelectedMailT[]
}

const FolderListColumn = ({ folders, setIsDroppedWindowOpen, selectedMails }:FolderListColumnProps):React.JSX.Element => {
	return (
		<div className={cl['folders-list-column']}>
			{
				MAIL_TYPES_CONF.map(type =>
					<FoldersListColumnItem
						folderName={type.title}
						folderPath={type.value}
						setIsDroppedWindowOpen={setIsDroppedWindowOpen}
						selectedMails={selectedMails}
						key={type.value}
					/>)
			}
			<div className={cl['folders-list-column__line']} />
			{
				folders.map(folder =>
					<FoldersListColumnItem
						folderName={folder.name}
						folderPath={folder.path}
						setIsDroppedWindowOpen={setIsDroppedWindowOpen}
						selectedMails={selectedMails}
						key={folder.path}
					/>)
			}
		</div>
	);
};

export default FolderListColumn;