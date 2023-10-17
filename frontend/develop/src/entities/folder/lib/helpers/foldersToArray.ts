import { FolderType } from '../types';

const recursionToArray = (folders: FolderType[], arrayOfFolders: FolderType[]):void => {
	folders.forEach(folder => {
		arrayOfFolders.push(folder);
		if ('folders' in folder) {
			recursionToArray(folder.folders!, arrayOfFolders);
		}
	});
};

export const foldersToArray = (folders: FolderType[]):FolderType[] => {
	const listOfFolders:FolderType[] = [];
	recursionToArray(folders, listOfFolders);
	return listOfFolders;
};