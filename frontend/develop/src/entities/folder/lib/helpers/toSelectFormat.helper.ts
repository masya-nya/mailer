import { BaseOptionType } from '../../../../shared/lib/types';
import { FolderType } from '../types';

const toSelectFormater = (folders:FolderType[], formatedFoldersStorage: BaseOptionType[]):void => {
	folders.forEach((folder) => {
		if ('folders' in folder) {
			toSelectFormater(folder.folders!, formatedFoldersStorage);
		}
		formatedFoldersStorage.push({
			value: folder.path,
			label: folder.name
		});
	});
};

export const toSelectFormat = (folders: FolderType[]):BaseOptionType[] => {
	const toSelectFormatFolders:BaseOptionType[] = [];
	toSelectFormater(folders, toSelectFormatFolders);
	return toSelectFormatFolders;
};
