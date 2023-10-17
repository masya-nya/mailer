import { BaseOptionType } from '../types';

export const targetValueInOptions = (value: string | null | undefined, options: BaseOptionType[]): BaseOptionType | null => {
	if (value) {
		const [option] = options.filter(option => option.value === value);
		return option;
	}
	return null;
};