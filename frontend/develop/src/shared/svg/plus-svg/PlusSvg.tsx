import React from 'react';
import { SvgProps } from '../../lib';

export const PlusSvg = ({ width, height, color }: SvgProps): React.JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width + 'px'} height={height + 'px'} viewBox="0 0 24 24" fill="none">
			<path d="M4 12H20M12 4V20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
};
