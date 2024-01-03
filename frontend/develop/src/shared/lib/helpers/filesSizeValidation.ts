import { FilesMaxSize } from '../consts';

export const filesSizeValidation = (filesSize:number) => {
	return filesSize > FilesMaxSize;
};