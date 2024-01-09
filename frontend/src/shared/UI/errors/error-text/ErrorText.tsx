import React from 'react';
import cl from './ErrorText.module.scss';

type ErrorTextProps = {
	title: string,
	style?: React.CSSProperties
}

export const ErrorText = ({ title, ...props }:ErrorTextProps):React.JSX.Element => {
	return (
		<div className={cl['error-text']} {...props}>
			<div className={cl['error-text__inner']}>
				{ title }
			</div>
		</div>
	);
};
