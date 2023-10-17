import React from 'react';
import cl from './ContextSelectWrapper.module.scss';

type ContextSelectWrapperProps = {
	children: React.ReactNode
	top: `${number}px`
}

export const ContextSelectWrapper = ({ children, top }:ContextSelectWrapperProps):React.JSX.Element => {
	return (
		<div style={{ top }} className={cl['context-select-wrapper']}>
			{ children }
		</div>
	);
};