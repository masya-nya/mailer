import React from 'react';
import { SvgProps } from '../../lib';

export const FileSvg = ({ width, height, color, colorBG = 'transparent' }: SvgProps): React.JSX.Element => {
	return (
		<svg width={width} height={height} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill='none' stroke={color} strokeLinecap='round' strokeLinejoin='round'>
			<path d="M39.5,15.5h-9a2,2,0,0,1-2-2v-9h-18a2,2,0,0,0-2,2v35a2,2,0,0,0,2,2h27a2,2,0,0,0,2-2Z"/><line x1="28.5" y1="4.5" x2="39.5" y2="15.5"/>
		</svg>
	);
};
