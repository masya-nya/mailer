import React, { FC } from 'react';
import { SvgProps } from '../types';

export const GoogleSvg: FC<SvgProps> = ({ width, height, color }): React.JSX.Element => {
	return (
		<svg width={width} height={height} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M10.85 4.86c-2.182-2.04-5.834-.878-6.76 1.846-.909 2.643 1.08 5.58 4.018 5.58 1.825 0 3.513-.912 3.86-2.801H8.107V6.784h6.745c.763 4.256-2.13 8.279-6.745 8.279-5.24 0-8.732-5.591-6.392-10.164C3.79.85 9.506-.259 12.891 2.86l-2.042 2z" fill={color}></path>
		</svg>
	);
};
