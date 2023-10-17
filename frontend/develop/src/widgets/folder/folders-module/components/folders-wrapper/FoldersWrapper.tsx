import React from 'react';
import cl from './FoldersWrapper.module.scss';
import Folder from '../folder/Folder';
import { FolderType } from '../../../../../entities/folder';

type FoldersWrapperProps = {
	folders: FolderType[]
}

const FoldersWrapper = ({ folders }: FoldersWrapperProps): React.JSX.Element => {
	return (
		<div className={cl['folders-wrapper']}>
			{
				folders.length
					? folders.map(folder => <Folder folder={folder} key={folder.path} />)
					: <div style={{ textAlign: 'center', lineHeight: '30px' }} >Папок нет</div>
			}
		</div>
	);
};

export default FoldersWrapper;
