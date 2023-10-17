import React, { useEffect, useState } from 'react';
import cl from './MailPage.module.scss';
import { MailModule, mailStore } from '../../../../modules/mail-module';
import { MailBox } from '../../../../shared/lib';
import { EmailsNavigator } from '../../../../widgets/email';

type MailPageProps = {
	mails: MailBox[]
}

const MailPage = ({ mails }:MailPageProps):React.JSX.Element => {
	const [selectedMail, setSelectedMail] = useState<MailBox | null>(mails[0]);

	const handleSetSelected = (mail: MailBox | null):void => {
		if (selectedMail?.email !== mail?.email) {
			setSelectedMail(mail);
			mailStore.mail = mail;
		}
		if (!mail) {
			mailStore.changeAllFetchingStatuses(false);
		}
	};

	useEffect(() => {
		mailStore.mail = mails[0];
	}, []);

	return (
		<div className={cl['mail-page']}>
			<EmailsNavigator mails={mails} selectedMail={selectedMail} handleSetSelected={handleSetSelected}/>
			<MailModule mail={selectedMail} />
		</div>
	);
};

export default MailPage;