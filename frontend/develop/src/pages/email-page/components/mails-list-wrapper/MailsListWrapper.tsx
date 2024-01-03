import React, { useContext, useEffect, useState } from 'react';
import cl from './MailsListWrapper.module.scss';
import { observer } from 'mobx-react-lite';
import { useSWRConfig } from 'swr';
import {
	MailT,
	SelectedMailT,
	useMails,
	formatingServerMailsforState,
} from 'src/entities/mails-list';
import { ErrorWindow, Loader } from 'src/shared/UI';
import { MailsList, MailsManager } from 'src/widgets/mails-list';
import { EmailContext } from 'src/entities/email';
import { DefaultFilterValues } from 'src/entities/email/lib/config';

export const MailsListWrapper = observer((): React.JSX.Element => {
	const { store: emailStore } = useContext(EmailContext);
	const [mails, setMails] = useState<MailT[]>([]);
	const [selectedMails, setSelectedMails] = useState<SelectedMailT[]>([]);
	const { data, isLoading, error, mutate } = useMails();
	const { cache } = useSWRConfig();
	useEffect(() => {
		console.log('data', data);
		setMails(formatingServerMailsforState(data ? [...data.mails] : []));
		setSelectedMails([]);
	}, [data]);

	useEffect(() => {
		cache.delete('getMails');
		mutate();
	}, [emailStore.mailsFilter.path, emailStore.mailsFilter.page, cache, mutate]);

	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return (
			<ErrorWindow
				title={error.message}
				messages={error.response?.data.message}
			/>
		);
	}

	return (
		<div className={cl['mails-list-wrapper']}>
			<MailsManager
				mails={mails}
				setMails={setMails}
				setSelectedMails={setSelectedMails}
				selectedMails={selectedMails}
			/>
			<MailsList
				mails={mails}
				setMails={setMails}
				setSelectedMails={setSelectedMails}
				page={data?.page || DefaultFilterValues.page}
				limit={data?.limit || DefaultFilterValues.limit}
				mailsCount={data?.mailsCount || 0}
			/>
		</div>
	);
});
