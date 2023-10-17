import React from 'react';
import { SvgProps } from '../../lib';

export const CrossSvg = ({ width, height, color, clickHandler, ...props }: SvgProps): React.JSX.Element => {
	return (
		<svg onClick={clickHandler} xmlns="http://www.w3.org/2000/svg" {...props} width={width + 'px'} height={height + 'px'} viewBox="0 0 16 16" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
			<path d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5"/>
		</svg>
	);
};
