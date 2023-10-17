import React from 'react';
import cl from './PaginationWrapper.module.scss';
import { PagintaionModule, DateFilterModule } from '../../../../../features/mails-list';
import { MailsDateFilterKeysT, mailStore } from '../../../../../modules/mail-module';
import { IMAPServiceNames } from '../../../../../shared/lib';

type PaginationWrapperProps = {
	page: number
	limit: number
	mailsCount: number
	changeMailsListPage: (newPage: number) => void
	changeDateFilter: (dateFilter:MailsDateFilterKeysT, value:string) => void
	applyDateFilter: () => void
}

const PaginationWrapper = ({ page, limit, mailsCount, changeMailsListPage, changeDateFilter, applyDateFilter }:PaginationWrapperProps):React.JSX.Element => {
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
			{
				(Boolean(mailsCount) || mailStore.isMailDateFiltersClear) && (mailStore.mail?.serviceName !== IMAPServiceNames.Mailru) &&
				<DateFilterModule
					fromDefault={mailStore.mailsFilter.dateFrom}
					toDefault={mailStore.mailsFilter.dateTo}
					changeDateFilter={changeDateFilter}
					applyDateFilter={applyDateFilter}
					isMailDateFiltersClear={mailStore.isMailDateFiltersClear}
				/>
			}
		</div>
	);
};

export default PaginationWrapper;