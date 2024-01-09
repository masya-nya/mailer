import React from 'react';
import cl from './LabelInline.module.scss';

type LabelInputInlineProps = {
	label: string
	children: React.ReactNode
}

export const LabelInline = ({ label, children }:LabelInputInlineProps):React.JSX.Element => {
	return (
		<label className={cl['label-input-inline']}>
			<div className={cl['label-input-inline__label']}>
				{ label }
			</div>
			{
				children
			}
		</label>
	);
};
