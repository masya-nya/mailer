import React, { FC } from 'react';
import { SvgProps } from '../types';

export const SpamSvg: FC<SvgProps> = ({ width, height, color }): React.JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
			<path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M13 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
			<path d="M17 16L19 18M21 20L19 18M19 18L21 16M19 18L17 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
};
