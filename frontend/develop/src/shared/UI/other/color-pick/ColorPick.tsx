import React from 'react';
import cl from './ColorPick.module.scss';
import { HEX } from '../../../lib/types';

type ColorPickProps = {
	color: HEX,
	colorHandler: (color: HEX) => void
}

export const ColorPick = ({ color, colorHandler }:ColorPickProps):React.JSX.Element => {
	return (
		<div onClick={() => colorHandler(color)} style={{ background: color }} className={cl['color-pick']}></div>
	);
};
