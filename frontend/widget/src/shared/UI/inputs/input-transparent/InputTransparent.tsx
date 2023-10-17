import React from 'react';
import cl from './InputTransparent.module.scss';
import cn from 'classnames';

type InputTransparentProps = {
	defaultValue?: string,
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
	placeholder?: string,
	type: 'text' | 'search' | 'password' | 'email',
	autofocus?: boolean,
	name?: string,
	className?: string,
	style?: React.CSSProperties,
	disabled?: boolean,
	warning?: boolean,
	maxLength?: number
}

export const InputTransparent = ({ onChangeHandler, className, warning, ...props }: InputTransparentProps):React.JSX.Element => {
	return (
		<input
			className={cn(cl['input-transparent'], { [cl['input-transparent--warning']]: warning }, className)}
			onChange={(event) => onChangeHandler(event)}
			{...props}
		/>
	);
};