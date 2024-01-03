import React from 'react';
import cl from './Amount.module.scss';

type AmountProp = {
	value: number | ''
}

export const Amount = ({ value }:AmountProp):React.JSX.Element => {
	return (
		<div className={cl['amount']}>
			{ !!value && value }
		</div>
	);
};
