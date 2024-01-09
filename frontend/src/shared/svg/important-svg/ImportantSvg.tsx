import React, { FC } from 'react';
import { SvgProps } from '../types';

export const ImportantSvg: FC<SvgProps> = ({ width, height, color = 'transparent', clickHandler, bgColor = 'transparent', ...props }): React.JSX.Element => {
	return (
		<svg onClick={clickHandler} {...props} fill={bgColor} width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M7 7.2C7 6.07989 7 5.51984 7.21799 5.09202C7.40973 4.71569 7.71569 4.40973 8.09202 4.21799C8.51984 4 9.07989 4 10.2 4H13.8C14.9201 4 15.4802 4 15.908 4.21799C16.2843 4.40973 16.5903 4.71569 16.782 5.09202C17 5.51984 17 6.07989 17 7.2V20L14.126 17.4453C13.3737 16.7766 12.9976 16.4423 12.5732 16.3154C12.1992 16.2035 11.8008 16.2035 11.4268 16.3154C11.0024 16.4423 10.6263 16.7766 9.87404 17.4453L7 20V7.2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
};