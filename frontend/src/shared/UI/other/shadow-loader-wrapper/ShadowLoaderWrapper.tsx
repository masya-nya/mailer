import React from 'react';
import cl from './ShadowLoaderWrapper.module.scss';
import cn from 'classnames';

type ShadowLoaderWrapperProps = {
	children: React.ReactNode,
	translucent?: boolean
}

export const ShadowLoaderWrapper = ({ children, translucent = false }:ShadowLoaderWrapperProps):React.JSX.Element => {
	return (
		<div className={cn(cl['shadow-loader-wrapper'], { [cl['shadow-loader-wrapper__translucent']]: translucent })}>
			{ children }
		</div>
	);
};
