export const isPublicSelectOptions = [
	{
		value: false,
		label: 'Личный шаблон'
	},
	{
		value: true,
		label: 'Публичный шаблон'
	}
];

export const recieverSelectOptions = [
	{
		value: 0,
		label: 'На email клиента'
	},
	{
		value: 1,
		label: 'На другой email'
	}
];
export const isPublicSelectSelectStyles = {
	container: (base: object) => ({
		...base,
		width: '100%',
		fontSize: '13px',
		flex: '0 0 calc(30% - 2px)'
	})
};
export const recieverSelectSelectStyles = {
	container: (base: object) => ({
		...base,
		width: '100%',
		fontSize: '13px'
	})
};