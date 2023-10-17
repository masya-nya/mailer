import { FolderType } from '../types';
export const MAX_FOLDER_NAME_LENGTH = 20;
export const FOLDER_TEMPLATE:FolderType = {
	name: '',
	path: '',
	subscribed: true,
	messages: 0,
	listed: true,
	folders: [],
	flags: {},
	delimiter: '/'
};