import React, { FC } from 'react';
import { SvgProps } from '../types';

export const ArrowDownSvg: FC<SvgProps> = ({ width, height, color, ...props }): React.JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...props} fill={'currentColor' || color} width={width} height={height} viewBox="0 0 96 96">
			<path d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z"/>
		</svg>
	);
};
