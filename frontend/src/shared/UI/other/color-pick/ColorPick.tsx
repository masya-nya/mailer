import React from 'react';
import cl from './ColorPick.module.scss';
import { HexArgument } from 'src/shared/svg';

type ColorPickProps = {
	color: HexArgument,
	colorHandler: (color: HexArgument) => void
}

export const ColorPick = ({ color, colorHandler }:ColorPickProps):React.JSX.Element => {
	return (
		<div onClick={() => colorHandler(color)} style={{ background: color }} className={cl['color-pick']}></div>
	);
};
