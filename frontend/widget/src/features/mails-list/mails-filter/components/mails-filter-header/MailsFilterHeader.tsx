import React from 'react';
import cl from './MailsFilterHeader.module.scss';
import cn from 'classnames';
import { COLORS } from '../../../../../shared/lib';
import { ArrowDownSvg } from '../../../../../shared/svg';

type MailsFilterHeaderProps = {
	onClickHandler: (event:React.MouseEvent<HTMLDivElement>) => void
	className?: string
}

const MailsFilterHeader = ({ onClickHandler, className }:MailsFilterHeaderProps) => {
	return (
		<div onClick={(event) => onClickHandler(event)} className={cn(cl['marks-filter-header'], className)}>
			<div className={cl['marks-filter-header--inner']}>
				Фильтр
			</div>
			<ArrowDownSvg width='15' height='15' color={COLORS.font_base_color} />
		</div>
	);
};

export default MailsFilterHeader;
