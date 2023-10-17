import React from 'react';
import cl from './PaginationInfo.module.scss';

type PaginationInfoProps = {
	limit: number
	mailsCount: number
	page: number
}

const PaginationInfo = ({ limit, mailsCount, page }: PaginationInfoProps):React.JSX.Element => {
	const from = (limit * (page - 1) + 1);
	const to = (limit * page) > mailsCount ? mailsCount : limit * page;
	return (
		<div className={cl['pagination-info']}>
			{from}-{to} из {mailsCount}
		</div>
	);
};

export default PaginationInfo;