import { UnitsOfSize } from '../consts';

export const formatSizeUnits = (bytes:number):string => {
	if (bytes >= UnitsOfSize.GB) {
		return (bytes / UnitsOfSize.GB).toFixed(2) + ' GB';
	}
	if (bytes >= UnitsOfSize.MB) {
		return (bytes / UnitsOfSize.MB).toFixed(2) + ' MB';
	}
	if (bytes >= UnitsOfSize.KB) {
		return (bytes / UnitsOfSize.KB).toFixed(2) + ' KB';
	}
	return bytes + ' Б';
};
