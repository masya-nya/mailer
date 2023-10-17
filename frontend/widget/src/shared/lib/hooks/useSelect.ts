import { useState } from 'react';
import { SingleValue, ActionMeta } from 'react-select';
import { BaseOptionType } from '../types';

export const useSelect = (defaultValue?:BaseOptionType | null):[BaseOptionType | null, (option: SingleValue<BaseOptionType>, actionMeta: ActionMeta<BaseOptionType>) => void] => {
	const [value, setValue] = useState(defaultValue || null);

	const setValueHandler = (option: SingleValue<BaseOptionType>) => {
		setValue(option);
	};

	return [value, setValueHandler];
};