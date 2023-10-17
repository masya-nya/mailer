import React from 'react';
import { SvgProps } from '../../lib';

export const UnreadSvg = ({ width, height, color, clickHandler, ...props }: SvgProps): React.JSX.Element => {
	return (
		<svg onClick={clickHandler} {...props} width={width + 'px'} height={height + 'px'} fill="none" viewBox="9.5 9.5 5 5">
			<path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill={color}/>
		</svg>
	);
};