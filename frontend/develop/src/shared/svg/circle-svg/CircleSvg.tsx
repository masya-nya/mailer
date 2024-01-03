import React, { FC } from 'react';
import { SvgProps } from '../types';

export const CircleSvg: FC<SvgProps> = ({ width, height, color, bgColor = 'transparent' }): React.JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill={bgColor} width={width} height={height} viewBox="0 0 24 24">
			<path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
};
