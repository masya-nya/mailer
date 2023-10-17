import React from 'react';
import cn from 'classnames';
import cl from './ButtonBack.module.scss';
import { COLORS } from '../../../lib/consts';
import { ArrowBackSvg } from '../../../svg';

type ButtonProps = {
	onClick: (event?: React.SyntheticEvent) => void,
	style?: React.CSSProperties,
	className?: string,
	disabled?: boolean
}

export const ButtonBack = ({ onClick, className, ...props }:ButtonProps): React.JSX.Element => {
	return (
		<div
			onClick={onClick}
			className={cn(cl['button-back'], className)}
			{...props}
		>
			<ArrowBackSvg
				width='20'
				height='20'
				color={COLORS.font_base_color}
				style={{ verticalAlign: 'baseline', marginBottom: '-4px', marginRight: '4px' }}
			/>
			Назад
		</div>
	);
};
