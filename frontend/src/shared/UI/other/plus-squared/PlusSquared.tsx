import React from 'react';
import cl from './PlusSquared.module.scss';
import { PlusSvg } from '../../../svg';

type PlusSquaredProps = {
	onClickHandler: () => void
	title?: string
}

export const PlusSquared = ({ onClickHandler, ...props }:PlusSquaredProps):React.JSX.Element => {
	return (
		<div onClick={onClickHandler} {...props} className={cl['plus-squared']}>
			<PlusSvg width='18px' height='18px' className={cl['plus-squared__plus']} />
		</div>
	);
};