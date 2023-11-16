import { SVGProps } from 'react';

export interface SvgProps<T> extends SVGProps<T> {
	width: `${string}px`
	height: `${string}px`
	bgColor?: `#${string}`
	color?: `#${string}`
}