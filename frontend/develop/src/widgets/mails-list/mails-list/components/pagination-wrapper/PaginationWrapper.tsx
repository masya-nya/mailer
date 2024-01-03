import React from 'react';
import cl from './PaginationWrapper.module.scss';
import { PagintaionModule } from 'src/features/mails-list';

type PaginationWrapperProps = {
	page: number
	limit: number
	mailsCount: number
	changeMailsListPage: (newPage: number) => void
}

const PaginationWrapper = ({ page, limit, mailsCount, changeMailsListPage }:PaginationWrapperProps):React.JSX.Element => {
	return (
		<div className={cl['pagination-wrapper']}>
			{
				Boolean(mailsCount)
					? <PagintaionModule
						limit={limit}
						mailsCount={mailsCount}
						page={page}
						changeMailsListPage={changeMailsListPage}
					/>
					: <span></span>
					// Этот span нужен только для того, чтобы не ломалась верстка, когда модуля PagintaionModule не будет
			}
		</div>
	);
};

export default PaginationWrapper;