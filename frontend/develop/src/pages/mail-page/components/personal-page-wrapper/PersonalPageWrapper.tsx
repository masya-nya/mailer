import React, { useEffect } from 'react';
import cl from './PersonalPageWrapper.module.scss';
import { AuthorizationModule } from '../../../../widgets/authorization';
import { LoaderCircle, ErrorWindow } from '../../../../shared/UI';
import { mailStore } from '../../../../modules/mail-module';
import { usePersonalMailBoxes } from '../../model/hooks/useMailBox';
import MailPage from '../mail-page/MailPage';

export const PersonalPageWrapper = (): React.JSX.Element => {
	mailStore.isCorporate = false;
	const { data: mails, isLoading: isMailsLoading, error: mailsError } = usePersonalMailBoxes();
	useEffect(() => {
		return () => {
			mailStore.mail = null;
		};
	}, []);

	const Content = ():React.JSX.Element => {
		if (isMailsLoading) {
			return <LoaderCircle />;
		}
		if (mailsError) {
			return <ErrorWindow title={mailsError.message} messages={mailsError.response?.data.message} />;
		}
		if (mails?.length) {
			return <MailPage mails={mails} />;
		}
		return <AuthorizationModule />;
	};

	return (
		<div className={cl['personal-mail-wrapper']}>
			<Content />
		</div>
	);
};
