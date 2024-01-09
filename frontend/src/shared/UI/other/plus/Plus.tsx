import React from 'react';
import cl from './Plus.module.scss';

type PlusProps = {
	onClickHandler: (event?: React.SyntheticEvent) => void
}

export const Plus = ({ onClickHandler }:PlusProps):React.JSX.Element => {
	return (
		<div onClick={(event) => onClickHandler(event)} className={cl['plus']}>
			+
		</div>
	);
};
