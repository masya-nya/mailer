import { DELIMITER } from '../../../../shared/lib/types';

export type FolderType = {
	name: string
	flags: {}
	path: string
	subscribed: boolean
	listed: boolean
	delimiter: DELIMITER
	messages: number
	folders?: FolderType[]
}

export type ActionsFoldersType = 'createChild' | 'createClear' | 'edit'