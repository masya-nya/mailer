import React from 'react';
import cl from './Logo.module.scss';

type LogoProps = {
	className?: string
}

export const Logo = ({ ...props }:LogoProps):React.JSX.Element => {
	return (
		<div {...props} className={cl['logo']}>
			<div className={cl['logo__inner']}>
				Письма от REON
			</div>
		</div>
	);
};
