import React from 'react';
import cl from './Mark.module.scss';
import { HexArgument } from 'src/shared/svg';

type MarkProps = {
	title: string,
	color: HexArgument
}

export const Mark = ({ title, color }:MarkProps):React.JSX.Element => {
	return (
		<div className={cl['mark']} style={{ background: color }}>
			<div className={cl['mark__text']} style={{ color, filter: 'brightness(50%) contrast(200%)' }} >
				{ title }
			</div>
		</div>
	);
};