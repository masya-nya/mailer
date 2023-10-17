import React from 'react';
import cl from './FolderHeading.module.scss';
import { FolderType } from '../../../../../entities/folder';
import { mailStore } from '../../../../../modules/mail-module';
import { Amount } from '../../../../../shared/UI';
import { ArrowToggle } from '../../../../../features/folder';

type FolderHeadingProps = {
	isChildrenOpen: boolean,
	isChildrenOpenHandler: (event: React.SyntheticEvent) => void,
	folder: FolderType,
	onContextMenuHandler: (event: React.MouseEvent<HTMLDivElement>) => void
}

const FolderHeading = ({ isChildrenOpen, folder, isChildrenOpenHandler, onContextMenuHandler }: FolderHeadingProps): React.JSX.Element => {
	return (
		<div className={cl['folder-heading']}>
			<div className={cl['folder-heading__left']}>
				{
					Boolean(folder.folders?.length) && <ArrowToggle isChildrenOpenHandler={isChildrenOpenHandler} isChildrenOpen={isChildrenOpen} />
				}
				<div onContextMenu={onContextMenuHandler} onClick={() => mailStore.changeMailsFolder({ path: folder.path, pathName: folder.name })} className={cl['folder-heading__name']} title={folder.name}>
					{folder.name}
				</div>
			</div>
			<div className={cl['folder-heading__amount']}>
				{
					Boolean(folder.messages) && <> (<Amount value={folder.messages} />) </>
				}
			</div>
		</div>
	);
};

export default FolderHeading;
