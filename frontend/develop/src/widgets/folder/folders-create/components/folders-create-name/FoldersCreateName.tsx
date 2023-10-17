import React from 'react';
import cl from './FoldersCreateName.module.scss';
import { MAX_FOLDER_NAME_LENGTH } from '../../../../../entities/folder';
import { Input } from '../../../../../shared/UI';

type FoldersCreateNameProps = {
	folderName: string,
	setFolderName: (event:React.ChangeEvent<HTMLInputElement>) => void,
	emptyFolderNameCheck: () => boolean
}

const FoldersCreateName = ({ emptyFolderNameCheck, setFolderName, folderName }:FoldersCreateNameProps): React.JSX.Element => {
	return (
		<div className={cl['folders-create__name']}>
			<div className={cl['folders-create__label']}>
				Имя папки:
			</div>
			<Input maxLength={MAX_FOLDER_NAME_LENGTH} warning={emptyFolderNameCheck()} defaultValue={folderName} placeholder='Введите название папки' style={{ width: '100%' }} type='text' onChangeHandler={setFolderName} />
		</div>
	);
};

export default FoldersCreateName;
