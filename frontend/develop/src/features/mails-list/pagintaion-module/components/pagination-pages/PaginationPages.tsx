import React, { useRef } from 'react';
import cl from './PaginationPages.module.scss';
import PaginationsPagesItem from '../pagination-pages-item/PaginationPagesItem';

type PaginationPagesProps = {
	currentPage: number
	countPages: number
	changeMailsListPage: (newPage: number) => void
}

const PaginationPages = ({ currentPage, countPages, changeMailsListPage }:PaginationPagesProps):React.JSX.Element => {
	const { current: startingNumber } = useRef<number>(1);
	const { current: difference } = useRef<number>(2);
	const fromOfBeginingList = currentPage - difference > startingNumber ? currentPage - difference : startingNumber + 1;
	const toOfBeginingList = currentPage + difference < countPages ? currentPage + difference : countPages - 1;
	const beginingList = [];
	for (let i = fromOfBeginingList; i <= toOfBeginingList; i++) {
		beginingList.push(i);
	}
	return (
		<div className={cl['pagination-pages']}>
			<PaginationsPagesItem pageNumber={startingNumber} currentPage={currentPage} changeMailsListPage={changeMailsListPage}/>
			{
				currentPage - (difference + 1) > startingNumber && '...'
			}
			{
				beginingList.map(number => <PaginationsPagesItem pageNumber={number} currentPage={currentPage} changeMailsListPage={changeMailsListPage} key={number} />)
			}
			{
				currentPage + (difference + 1) < countPages && '...'
			}
			{ countPages !== 1 && <PaginationsPagesItem pageNumber={countPages} currentPage={currentPage} changeMailsListPage={changeMailsListPage}/>}
		</div>
	);
};

export default PaginationPages;
