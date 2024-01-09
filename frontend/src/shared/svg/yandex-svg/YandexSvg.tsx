import React, { FC } from 'react';
import { SvgProps } from '../types';

export const YandexSvg: FC<SvgProps> = ({ width, height, color }): React.JSX.Element => {
	return (
		<svg width={width} height={height} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M10.255 9.983V16h1.75V0H9.39C6.823 0 4.664 1.735 4.664 5.115c0 2.411.954 3.719 2.386 4.44L4.005 16h2.022L8.8 9.983h1.454zm-.006-1.404h-.932c-1.522 0-2.773-.834-2.773-3.426 0-2.681 1.364-3.639 2.773-3.639h.932V8.58z" fill={color}></path>
		</svg>
	);
};
