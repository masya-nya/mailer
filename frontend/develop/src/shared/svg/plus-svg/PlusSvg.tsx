import React, { FC } from 'react';
import { SvgProps } from '../types';

export const PlusSvg: FC<SvgProps> = ({ width, height, color }): React.JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
			<path d="M4 12H20M12 4V20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
};
