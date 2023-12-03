import { ChangeEvent, useCallback, useState } from 'react';


export const useTextInput = (initial: string = ''):[value: string, setValueHandler: (e: ChangeEvent<HTMLInputElement>) => void] => {
	const [value, setValue] = useState(initial);

	const setValueHandler  = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	return [value, setValueHandler];
};