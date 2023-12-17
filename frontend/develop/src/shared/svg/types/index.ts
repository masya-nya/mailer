import { SVGProps } from 'react';

export type PixelArgument = `${string}px`;
export type HexArgument = `#${string}`;

export interface SvgProps<T> extends SVGProps<T> {
	width: PixelArgument
	height: PixelArgument
	bgColor?: HexArgument
	color?: HexArgument
}