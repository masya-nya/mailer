import React, { FC } from 'react';
import { SvgProps } from '../types';

export const ReplyArrowSvg: FC<SvgProps> = ({ width, height, color, ...props }): React.JSX.Element => {
	return (
		<svg {...props} width={width} height={height} viewBox="0 0 24 24" fill='transparent' xmlns="http://www.w3.org/2000/svg">
			<path d="M9.446 3.9974L4.7699 8.13188C2.9233 9.76455 2 10.5809 2 11.6325C2 12.6842 2.9233 13.5005 4.7699 15.1332L9.446 19.2677C10.2889 20.0129 10.7103 20.3856 11.0578 20.2303C11.4053 20.0751 11.4053 19.5143 11.4053 18.3925V15.6472C15.6432 15.6472 20.2342 17.6545 22 21C22 10.2943 15.7217 7.61792 11.4053 7.61792V4.87257C11.4053 3.75082 11.4053 3.18995 11.0578 3.03474C10.7103 2.87953 10.2889 3.25215 9.446 3.9974Z" stroke={color || 'currentColor'}/>
		</svg>
	);
};