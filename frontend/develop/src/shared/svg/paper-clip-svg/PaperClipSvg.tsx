import React, { FC } from 'react';
import { SvgProps } from '../types';

export const PaperClipSvg: FC<SvgProps> = ({ width, height, color }): React.JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width={width} height={height} viewBox="0 0 24 24">
			<path id="primary" d="M18.77,15.27l-3.95,3.95a6.1,6.1,0,0,1-8.61,0h0a6.09,6.09,0,0,1,0-8.6l6.43-6.43a4,4,0,0,1,5.74,0h0a4.06,4.06,0,0,1,0,5.73l-6.74,6.74a2,2,0,0,1-2.87,0h0a2,2,0,0,1,0-2.87l7.05-7" stroke={color} style={{ fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }} />{/* " fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;" */}
		</svg>
	);
};
