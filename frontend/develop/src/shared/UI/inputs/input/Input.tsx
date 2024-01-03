import React from 'react';
import cl from './Input.module.scss';
import cn from 'classnames';

type InputProps = {
	value?: string
	defaultValue?: string,
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
	placeholder?: string,
	type: 'text' | 'search' | 'password' | 'email',
	name?: string,
	autofocus?: boolean,
	className?: string,
	style?: React.CSSProperties,
	disabled?: boolean,
	warning?: boolean,
	maxLength?: number
	id?: string
}

export const Input = ({ onChangeHandler, className, warning, ...props }: InputProps):React.JSX.Element => {
	return (
		<input
			className={cn(cl['input'], { [cl['input--warning']]: warning }, className)}
			onChange={onChangeHandler}
			{...props}
		/>
	);
};