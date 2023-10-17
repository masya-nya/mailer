import React from 'react';
import cl from './PaginationPagesItem.module.scss';
import cn from 'classnames';

type PaginationsPagesItemProps = {
	pageNumber: number
	currentPage: number
	changeMailsListPage: (newPage: number) => void
}

const PaginationsPagesItem = ({ pageNumber, currentPage, changeMailsListPage }:PaginationsPagesItemProps):React.JSX.Element => {
	return (
		<div
			onClick={() => changeMailsListPage(pageNumber)}
			className={
				cn(
					cl['pagination-pages-item'],
					{
						[cl['pagination-pages-item--active']]: pageNumber === currentPage
					}
				)
			}
		>
			{ pageNumber }
		</div>
	);
};

export default PaginationsPagesItem;
