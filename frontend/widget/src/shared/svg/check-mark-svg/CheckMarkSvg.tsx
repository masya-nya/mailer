import React from 'react';
import { SvgProps } from '../../lib';

export const CheckMarkSvg = ({ width, height, color, ...props }: SvgProps): React.JSX.Element => {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" fill={color} width={width + 'px'} height={height + 'px'} viewBox="0 0 1920 1920">
			<path d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z" fillRule="evenodd"/>
		</svg>
	);
};
