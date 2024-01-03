import React, { FC } from 'react';
import { SvgProps } from '../types';

export const MarkSvg: FC<SvgProps> = ({ width, height, color }): React.JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill={color} width={width} height={height} viewBox="0 0 512 512">
			<path d="M213.3,0h-128C38.2,0,0,38.2,0,85.3v128L298.7,512L512,298.7L213.3,0z M85.3,128c-23.6,0-42.7-19.1-42.7-42.7  s19.1-42.7,42.7-42.7S128,61.8,128,85.3S108.9,128,85.3,128z" />
		</svg>
	);
};