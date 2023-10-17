import { useState } from 'react';
import { SingleValue, ActionMeta } from 'react-select';
import { BaseOptionType } from '../types';

export const useSelect = <T>(defaultValue?:BaseOptionType<T> | null):[BaseOptionType<T> | null, (option: SingleValue<BaseOptionType<T>>) => void] => {
	const [value, setValue] = useState(defaultValue || null);

	const setValueHandler = (option: SingleValue<BaseOptionType<T>>) => {
		setValue(option);
	};

	return [value, setValueHandler];
};