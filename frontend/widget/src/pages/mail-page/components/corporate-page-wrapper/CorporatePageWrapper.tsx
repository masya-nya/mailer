import React, { useEffect, useState } from 'react';
import cl from './CorporatePageWrapper.module.scss';
import { AuthorizationModule } from '../../../../widgets/authorization';
import { ErrorWindow, LoaderCircle } from '../../../../shared/UI';
import { mailStore } from '../../../../modules/mail-module';
import { useCorporateMailBoxes } from '../../model/hooks/useMailBox';
import { MailBox } from '../../../../shared/lib';
import { filterUnallowedEmails } from './CorporatePageWrapper.helper';
import MailPage from '../mail-page/MailPage';

export const CorporatePageWrapper = ():React.JSX.Element => {
	mailStore.isCorporate = true;
	const { data: mails, isLoading: isMailsLoading, error: mailsError } = useCorporateMailBoxes();
	const [filteredMails, setFilteredMails] = useState<MailBox[]>([]);

	const Content = ():React.JSX.Element => {
		if (isMailsLoading || !mails) {
			return <LoaderCircle />;
		}
		if (mailsError) {
			return <ErrorWindow title={mailsError.message} messages={mailsError.response?.data.message} />;
		}
		if (mails.length) {
			return <MailPage mails={filteredMails} />;
		}
		return <AuthorizationModule />;
	};

	useEffect(() => {
		return () => {
			mailStore.mail = null;
		};
	}, []);

	useEffect(() => {
		if (mails) {
			setFilteredMails(filterUnallowedEmails(mails));
		}
	}, [mails]);

	return (
		<div className={cl['corporate-mail-wrapper']}>
			<Content />
		</div>
	);
};
