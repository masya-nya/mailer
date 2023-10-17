import React from 'react';
import cl from './MarksAddingHeader.module.scss';
import cn from 'classnames';
import { COLORS } from '../../../../../shared/lib';
import { MarkSvg, ArrowDownSvg } from '../../../../../shared/svg';

type MarksAddingHeaderProps = {
	onClickHandler: (event:React.MouseEvent<HTMLDivElement>) => void
	className?: string
}

const MarksAddingHeader = ({ onClickHandler, className }:MarksAddingHeaderProps):React.JSX.Element => {
	return (
		<div onClick={(event) => onClickHandler(event)} className={cn(cl['marks-adding-header'], className)}>
			<MarkSvg width='15' height='15' color={COLORS.font_base_color} />
			<div className={cl['marks-adding-header--inner']}>
				Метка
			</div>
			<ArrowDownSvg width='15' height='15' color={COLORS.font_base_color} />
		</div>
	);
};

export default MarksAddingHeader;