import React, { useRef, useState } from 'react';

export const useEntered =
(
	value:string[]
): [
	string[],
	React.Dispatch<string[]>,
	(newValue: string) => boolean,
	(recedingValue: string) => void
] => {
	const [entered, setEntered] = useState<string[]>(value);
	const { current: EmailRegValidation } = useRef(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

	const addEnteredValueHandler = (newValue: string):boolean => {
		if (
			Boolean(newValue) &&
			!entered.includes(newValue) &&
			EmailRegValidation.test(newValue)
		) {
			setEntered(prev => [...prev, newValue]);
			return true;
		}
		return false;
	};

	const deleteEnteredValueHandler = (recedingValue: string):void => {
		setEntered(prev => prev.filter(value => value !== recedingValue));
	};

	return [entered, setEntered, addEnteredValueHandler, deleteEnteredValueHandler];
};