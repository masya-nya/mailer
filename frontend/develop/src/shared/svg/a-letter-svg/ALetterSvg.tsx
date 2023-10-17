import React from 'react';
import { SvgProps } from '../../lib';

export const ALetterSvg = ({ width, height, color }: SvgProps): React.JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width + 'px'} height={height + 'px'} viewBox="0 0 64.000000 64.000000">
			<g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
				<path d="M138 593 c-15 -2 -41 -18 -57 -34 -37 -37 -44 -86 -39 -280 6 -230 11 -234 283 -234 269 0 270 1 270 275 0 272 -2 274 -260 276 -93 1 -182 0 -197 -3z m272 -126 c54 -19 68 -54 72 -184 l3 -113 -57 0 c-31 0 -58 5 -60 10 -2 7 -18 5 -43 -6 -87 -36 -175 3 -175 78 0 57 30 81 123 102 78 17 102 36 47 36 -16 0 -33 -7 -38 -16 -13 -24 -122 -10 -122 16 0 27 38 69 73 79 45 13 136 12 177 -2z"/>
				<path d="M312 286 c-34 -9 -42 -38 -12 -44 22 -4 53 21 49 39 -3 12 -11 13 -37 5z"/>
			</g>
		</svg>
	);
};
