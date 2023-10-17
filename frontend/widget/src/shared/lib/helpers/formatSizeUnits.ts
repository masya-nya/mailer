export const formatSizeUnits = (bytes:number):string => {
	if (bytes >= 1073741824) {
		return (bytes / 1073741824).toFixed(2) + ' GB';
	}
	if (bytes >= 1048576) {
		return (bytes / 1048576).toFixed(2) + ' MB';
	}
	if (bytes >= 1024) {
		return (bytes / 1024).toFixed(2) + ' KB';
	}
	return bytes + ' Б';
};
