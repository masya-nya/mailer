import React from 'react';
import cl from './PagintaionModule.module.scss';
import PaginationInfo from './components/pagination-info/PaginationInfo';
import PaginationControl from './components/pagination-control/PaginationControl';
import PaginationPages from './components/pagination-pages/PaginationPages';

type PagintaionModuleProps = {
	limit: number
	mailsCount: number
	page: number
	changeMailsListPage: (newPage: number) => void
}

export const PagintaionModule = ({ limit, mailsCount, page, changeMailsListPage }:PagintaionModuleProps):React.JSX.Element => {
	const countPages = mailsCount % limit !== 0 ? Math.floor(mailsCount / limit) + 1 : Math.floor(mailsCount / limit);

	return (
		<div className={cl['pagination-module']}>
			<PaginationInfo limit={limit} mailsCount={mailsCount} page={page} />
			<PaginationControl changeMailsListPage={changeMailsListPage} page={page} countPages={countPages} />
			{
				countPages > 1 &&
				<PaginationPages changeMailsListPage={changeMailsListPage} currentPage={page} countPages={countPages} />
			}
		</div>
	);
};