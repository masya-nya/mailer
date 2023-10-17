import React from 'react';
import cl from './FolderChildren.module.scss';
import Folder from '../folder/Folder';
import { FolderType } from '../../../../../entities/folder';

type FolderChildrenProps = {
	folderChildren: FolderType[]
}

const FolderChildren = ({ folderChildren }:FolderChildrenProps):React.JSX.Element => {
	return (
		<div className={cl['folder-children']}>
			{
				folderChildren.map(folder => <Folder folder={folder} key={folder.path} />)
			}
		</div>
	);
};

export default FolderChildren;
