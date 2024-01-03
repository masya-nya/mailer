import { SVGProps } from 'react';

export type PixelArgument = `${string}px`;
export type HexArgument = `#${string}`;

export interface SvgProps extends SVGProps<SVGSVGElement> {
	width: PixelArgument
	height: PixelArgument
	bgColor?: HexArgument | 'transparent'
	color?: HexArgument | 'transparent'
	clickHandler?: ((event: React.MouseEvent) => void) | ((event: React.MouseEvent) => Promise<void>)
}