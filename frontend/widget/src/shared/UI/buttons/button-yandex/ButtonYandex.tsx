import React from 'react';
import cl from './ButtonYandex.module.scss';
import cn from 'classnames';

type ButtonYandexProp = {
	children: string,
	clickHandler: (event?: React.SyntheticEvent) => void,
	style?: React.CSSProperties,
	className?: string,
	disabled?: boolean
}

export const ButtonYandex = ({ children, clickHandler, className, ...props }: ButtonYandexProp): React.JSX.Element => {
	return (
		<button
			onClick={(event) => clickHandler(event)}
			className={
				cn(
					cl['button-yandex'],
					className
				)}
			{...props}
		>
			{children}
		</button>
	);
};