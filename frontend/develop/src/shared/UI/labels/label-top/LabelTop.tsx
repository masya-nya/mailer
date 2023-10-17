import React from 'react';
import cl from './LabelTop.module.scss';
import cn from 'classnames';

type LabelTopProps = {
	label: string
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	warning?: boolean
	name?: string
}
export const LabelTop = ({ children, label, className, name, ...props }:LabelTopProps):React.JSX.Element => {
	return (
		<div {...props} className={cn(cl['label-top'], className)}>
			<label className={cl['label-top__label']} htmlFor={name} >
				{ label }
			</label>
			{ children }
		</div>
	);
};
