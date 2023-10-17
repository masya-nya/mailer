import React from 'react';
import cl from './ColorsPicker.module.scss';
import { HEX } from '../../../shared/lib';
import ColorsRow from './components/colors-row/ColorsRow';
import { PALETTE_COLORS } from './lib/config';

type ColorsPickerProps = {
	selectedColorHandler: React.Dispatch<HEX>
}

export const ColorsPicker = ({ selectedColorHandler }:ColorsPickerProps):React.JSX.Element => {
	return (
		<div className={cl['colors-list']}>
			{
				Object.entries(PALETTE_COLORS).map(([id, colors]) => <ColorsRow colorHandler={selectedColorHandler} colors={colors} key={id} />)
			}
		</div>
	);
};
