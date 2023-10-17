import React, { useEffect, useState } from 'react';
import cl from './MailsListWrapper.module.scss';
import { observer } from 'mobx-react-lite';
import { useSWRConfig } from 'swr';
import { MailT, SelectedMailT, useMails, formatingServerMailsforState } from '../../../../entities/mails-list';
import { ErrorWindow, LoaderCircle } from '../../../../shared/UI';
import { MailsList, MailsManager } from '../../../../widgets/mails-list';
import { DefaultFilterValues } from '../../lib/config';
import { mailStore } from '../..';

export const MailsListWrapper = observer(():React.JSX.Element => {
	const [mails, setMails] = useState<MailT[]>([]);
	const [selectedMails, setSelectedMails] = useState<SelectedMailT[]>([]);
	const [marksOfSelectedMails, setMarksOfSelectedMail] = useState<string[]>([]);
	const { data, isLoading, error, mutate } = useMails();
	const { cache } = useSWRConfig();
	useEffect(() => {
		console.log('data', data);
		setMails(formatingServerMailsforState(data ? [...data.mails] : []));
		setSelectedMails([]);
		setMarksOfSelectedMail([]);
	}, [data]);

	useEffect(() => {
		cache.delete('getMails');
		mutate();
	}, [mailStore.mailsFilter.path, mailStore.mailsFilter.page]);

	if (isLoading) {
		return <LoaderCircle />;
	}
	if (error) {
		return <ErrorWindow title={error.message} messages={error.response?.data.message} />;
	}

	return (
		<div className={cl['mails-list-wrapper']}>
			<MailsManager mails={mails} setMails={setMails} setMarksOfSelectedMail={setMarksOfSelectedMail} marksOfSelectedMails={marksOfSelectedMails} setSelectedMails={setSelectedMails} selectedMails={selectedMails} />
			<MailsList
				mails={mails}
				setMails={setMails}
				setMarksOfSelectedMail={setMarksOfSelectedMail}
				setSelectedMails={setSelectedMails}
				page={data?.page || DefaultFilterValues.page}
				limit={data?.limit || DefaultFilterValues.limit}
				mailsCount={data?.mailsCount || 0}
			/>
		</div>
	);
});
