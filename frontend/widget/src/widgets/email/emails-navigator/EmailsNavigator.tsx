import React from 'react';
import cl from './EmailsNavigator.module.scss';
import { IS_ADMIN, MailBox } from '../../../shared/lib';
import EmailsNavigatorItem from './components/emails-navigator-item/EmailsNavigatorItem';
import EmailsNavigatorPlus from './components/emails-navigator-plus/EmailsNavigatorPlus';
import { mailStore } from '../../../modules/mail-module';

type EmailsNavigatorProps = {
	mails: MailBox[],
	selectedMail: MailBox | null,
	handleSetSelected: (React.Dispatch<MailBox | null>)
}

export const EmailsNavigator = ({ mails, selectedMail, handleSetSelected }:EmailsNavigatorProps):React.JSX.Element => {
	return (
		<div className={cl['emails-navigator']}>
			{
				mails.map(mail => <EmailsNavigatorItem mail={mail} selectedMail={selectedMail} handleSetSelected={handleSetSelected} key={mail.email} />)
			}
			{
				(!mailStore.isCorporate || (mailStore.isCorporate && IS_ADMIN)) && <EmailsNavigatorPlus onClickHandler={handleSetSelected} />
			}
		</div>
	);
};
