import React from 'react';
import cl from './MailsList.module.scss';
import { useSWRConfig } from 'swr';
import { MailT, SelectedMailT } from '../../../entities/mails-list';
import { mailStore, MailsDateFilterKeysT } from '../../../modules/mail-module';
import MailsListBody from './components/mails-list-body/MailsListBody';
import PaginationWrapper from './components/pagination-wrapper/PaginationWrapper';

type MailsListProps = {
	mails: MailT[] | []
	setMails: React.Dispatch<(prev: MailT[]) => MailT[]>
	setSelectedMails: React.Dispatch<(prev: SelectedMailT[]) => SelectedMailT[]>
	setMarksOfSelectedMail: React.Dispatch<((prev: string[]) => string[]) | string[]>
	page: number
	limit: number
	mailsCount: number
}

export const MailsList = ({ mails, setSelectedMails, setMails, setMarksOfSelectedMail, page, limit, mailsCount }: MailsListProps): React.JSX.Element => {
	const { cache, mutate } = useSWRConfig();
	const changeMailsListPage = (newPageValue:number):void => {
		mailStore.mailsFilter = { page: newPageValue };
		mutate('getMails');
	};

	const changeDateFilter = (dateFilter:MailsDateFilterKeysT, value:string):void => {
		mailStore.mailsFilter = { [dateFilter]: value };
	};

	const applyDateFilter = ():void => {
		cache.delete('getMails');
		mutate('getMails');
	};

	return (
		<div className={cl['mails-list']}>
			<MailsListBody
				mails={mails}
				setSelectedMails={setSelectedMails}
				setMails={setMails}
				setMarksOfSelectedMail={setMarksOfSelectedMail}
			/>
			<PaginationWrapper
				limit={limit}
				mailsCount={mailsCount}
				page={page}
				changeMailsListPage={changeMailsListPage}
				changeDateFilter={changeDateFilter}
				applyDateFilter={applyDateFilter}
			/>
		</div>
	);
};
