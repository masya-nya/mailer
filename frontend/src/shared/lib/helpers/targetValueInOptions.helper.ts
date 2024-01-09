import { BaseOptionType } from '../types';

export const targetValueInOptions = <T>(value: T | null | undefined, options: BaseOptionType<T>[]): BaseOptionType<T> | null => {
	const [option] = options.filter(option => option.value === value);
	return option;
};