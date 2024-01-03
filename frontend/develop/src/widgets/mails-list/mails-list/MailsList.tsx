import React, { useContext } from 'react';
import cl from './MailsList.module.scss';
import { useSWRConfig } from 'swr';
import { MailT, SelectedMailT } from '../../../entities/mails-list';
import MailsListBody from './components/mails-list-body/MailsListBody';
import PaginationWrapper from './components/pagination-wrapper/PaginationWrapper';
import { EmailContext } from 'src/entities/email';

type MailsListProps = {
	mails: MailT[] | []
	setMails: React.Dispatch<(prev: MailT[]) => MailT[]>
	setSelectedMails: React.Dispatch<(prev: SelectedMailT[]) => SelectedMailT[]>
	page: number
	limit: number
	mailsCount: number
}

export const MailsList = ({ mails, setSelectedMails, setMails, page, limit, mailsCount }: MailsListProps): React.JSX.Element => {
	const { store: emailStore } = useContext(EmailContext);
	const { mutate } = useSWRConfig();
	const changeMailsListPage = (newPageValue:number):void => {
		emailStore.mailsFilter = { page: newPageValue };
		mutate('getMails');
	};

	return (
		<div className={cl['mails-list']}>
			<MailsListBody
				mails={mails}
				setSelectedMails={setSelectedMails}
				setMails={setMails}
			/>
			<PaginationWrapper
				limit={limit}
				mailsCount={mailsCount}
				page={page}
				changeMailsListPage={changeMailsListPage}
			/>
		</div>
	);
};
