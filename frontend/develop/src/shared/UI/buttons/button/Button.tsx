import React from 'react';
import cl from './Button.module.scss';
import cn from 'classnames';

type ButtonProp = {
	children: string,
	type: 'primary' | 'accent' | 'danger' | 'warning',
	clickHandler: (event?: React.SyntheticEvent) => void,
	style?: React.CSSProperties,
	className?: string,
	disabled?: boolean
}

export const Button = ({ children, type, clickHandler, className, ...props }: ButtonProp): React.JSX.Element => {
	return (
		<button
			onClick={(event) => clickHandler(event)}
			className={
				cn(
					cl['button'],
					cl[`button__${type}`],
					className
				)}
			{...props}
		>
			{children}
		</button>
	);
};