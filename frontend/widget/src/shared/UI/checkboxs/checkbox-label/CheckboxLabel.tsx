import React, { useRef } from 'react';
import cl from './CheckboxLabel.module.scss';
import { Checkbox } from '..';

type CheckboxLabelProps = {
	checked: boolean
	checkedHandler: (event: React.SyntheticEvent, value: boolean) => void
	children: React.ReactNode
}

export const CheckboxLabel = ({ checked, checkedHandler, children }:CheckboxLabelProps):React.JSX.Element => {
	const checkboxLabelNode = useRef<HTMLInputElement>(null);

	const labelClickHandler = () => {
		checkboxLabelNode.current && checkboxLabelNode.current.click();
	};

	return (
		<div onClick={labelClickHandler} className={cl['checkbox-label']}>
			<Checkbox ref={checkboxLabelNode} checked={checked} checkedHandler={checkedHandler} />
			<div className={cl['checkbox-label__label']}>
				{ children }
			</div>
		</div>
	);
};
