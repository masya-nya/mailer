import React, { useState } from 'react';

export const useInput = (defaultValue = ''):[string, (event:React.ChangeEvent<HTMLInputElement>) => void, React.Dispatch<string>] => {
	const [value, setValue] = useState(defaultValue);

	const setValueHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return [value, setValueHandler, setValue];
};