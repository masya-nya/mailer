import React from 'react';
import cl from './DatePicker.module.scss';

type DatePickerProps = {
	defaultValue?: string
	onChangeHandler: (event:React.ChangeEvent<HTMLInputElement>, dateType?: string) => void
}

export const DatePicker = ({ defaultValue, onChangeHandler }:DatePickerProps): React.JSX.Element => {
	return (
		<input
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(event, 'dateFrom')}
			defaultValue={defaultValue}
			className={cl['date-picker']}
			type="date"
		/>
	);
};
