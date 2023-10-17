import React from 'react';
import cl from './FoldersListColumnItem.module.scss';
import { useSWRConfig } from 'swr';
import { SelectedMailT, mailsService } from '../../../../../entities/mails-list';
import FolderIconSelector from '../folder-icon-selector/FolderIconSelector';
import { appShadowLoaderStore } from '../../../../../features/general';

type FoldersListColumnItemProps = {
	folderPath: string
	folderName: string
	setIsDroppedWindowOpen: React.Dispatch<boolean>
	selectedMails: SelectedMailT[]
}

const FoldersListColumnItem = ({ folderPath, folderName, setIsDroppedWindowOpen, selectedMails }:FoldersListColumnItemProps):React.JSX.Element => {
	const { mutate } = useSWRConfig();
	const changeFolderAction = async ():Promise<void> => {
		setIsDroppedWindowOpen(false);
		appShadowLoaderStore.isLoading = true;
		const status = await mailsService.moveMsg(folderPath, selectedMails);
		if (status) {
			await mutate('getMails');
			await mutate('getFolders');
			await mutate('getBaseMailBoxesCount');
		}
		appShadowLoaderStore.isLoading = false;
	};

	return (
		<div onClick={changeFolderAction} className={cl['folders-list-column-item']} title={folderName}>
			<FolderIconSelector folderPath={folderPath} />
			<div className={cl['folders-list-column-item__inner']}>
				{ folderName }
			</div>
		</div>
	);
};

export default FoldersListColumnItem;