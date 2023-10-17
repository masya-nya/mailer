import React, { useState } from 'react';

export const useToggle = (value = false):[boolean, (event?: React.SyntheticEvent) => void, React.Dispatch<boolean>] => {
	const [isModalShow, setIsModalShow] = useState(value);

	const isModalShowHandler = (event?: React.SyntheticEvent):void => {
		event && event.stopPropagation();
		setIsModalShow(!isModalShow);
	};
	return [isModalShow, isModalShowHandler, setIsModalShow];
};