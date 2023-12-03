import { FC } from 'react';
import { SvgProps } from '../types';

export const ThemeSvg: FC<SvgProps<SVGSVGElement>> = ({
	width,
	height,
	color,
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
		>
			<g
				id="🔍-Product-Icons"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd"
			>
				<g
					id="ic_fluent_dark_theme_24_filled"
					fill={color}
					fillRule="nonzero"
				>
					<path
						d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20 L12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z"
						id="🎨-Color"
					></path>
				</g>
			</g>
		</svg>
	);
};
