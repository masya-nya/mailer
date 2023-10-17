export const takeFileExtension = (fileName: string) => {
	const fileNameSplited = fileName.split('.');
	return fileNameSplited[fileNameSplited.length - 1] || '?';
};