import React from 'react';
import { SvgProps } from '../../lib';

export const DeleteSvg = ({ width, height, color, ...props }: SvgProps): React.JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...props} width={width + 'px'} height={height + 'px'} viewBox="0 0 24 24" fill="none">
			<path d="M4 7H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
};
