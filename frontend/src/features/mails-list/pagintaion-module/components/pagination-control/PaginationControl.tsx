import React from 'react';
import cl from './PaginationControl.module.scss';
import cn from 'classnames';
import { ArrowLeftSvg, ArrowRightSvg } from '../../../../../shared/svg';
import { SWGColors } from 'src/shared/lib';

type PaginationControlProps = {
	changeMailsListPage: (nawPage: number) => void
	page: number
	countPages: number
}

const PaginationControl = ({ changeMailsListPage, page, countPages }:PaginationControlProps): React.JSX.Element => {
	return (
		<div className={cl['pagination-control']}>
			<div
				onClick={() => changeMailsListPage(--page)}
				className={
					cn(
						cl['pagination-control__back'],
						cl['pagination-control__arrow'],
						{
							[cl['pagination-control--inactive']]: page <= 1
						}
					)
				}
			>
				<ArrowLeftSvg width='18px' height='18px' color={SWGColors.grey} style={{ margin: '0 0 0 -2px' }} />
			</div>
			<div
				onClick={() => changeMailsListPage(++page)}
				className={
					cn(
						cl['pagination-control__next'],
						cl['pagination-control__arrow'],
						{
							[cl['pagination-control--inactive']]: page >= countPages
						}
					)
				}
			>
				<ArrowRightSvg width='18px' height='18px' color={SWGColors.grey} style={{ margin: '0 -2px 0 0' }} />
			</div>
		</div>
	);
};

export default PaginationControl;