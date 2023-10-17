import cn from 'classnames';
import React from 'react';
import cl from './ButtonReply.module.scss';
import { ReplyArrowSvg } from '../../../svg';

type ButtonReplyProps = {
	onClickHandler: (event?: React.SyntheticEvent) => void,
	style?: React.CSSProperties,
	className?: string,
	disabled?: boolean
}

export const ButtonReply = ({ onClickHandler, className, ...props }:ButtonReplyProps): React.JSX.Element => {
	return (
		<div
			onClick={onClickHandler}
			className={cn(cl['button-reply'], className)}
			{...props}
		>
			<ReplyArrowSvg
				height='22'
				width='22'
				style={{ verticalAlign: 'middle', marginRight: '4px', marginTop: '-4px' }}
			/>
			Ответить
		</div>
	);
};