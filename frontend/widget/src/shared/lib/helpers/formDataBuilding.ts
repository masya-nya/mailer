type FormDataBuildingT = {
	files?: File[]
	[name: string]: unknown
}

export const formDataBuilding = (arrayOfData: FormDataBuildingT):FormData => {
	const formData = new FormData();
	Object.entries(arrayOfData).forEach(([key, value]) => {
		if (key === 'files' && arrayOfData[key]) {
			arrayOfData[key]!.forEach(file => {
				formData.append('files', file, file.name);
			});
		} else {
			if (Array.isArray(arrayOfData[key])) {
				formData.append(key, JSON.stringify(arrayOfData[key]));
			} else {
				formData.append(key, String(value));
			}
		}
	});
	return formData;
};