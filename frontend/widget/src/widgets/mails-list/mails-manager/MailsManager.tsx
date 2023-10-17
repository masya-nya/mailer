import React from 'react';
import cl from './MailsManager.module.scss';
import { MailT, SelectedMailT } from '../../../entities/mails-list';
import { MailsFilter } from '../../../features/mails-list';
import { MailsManagerControl } from './components/mails-manager-control/MailsManagerControl';

type MailsManagerProps = {
	mails: MailT[]
	setMails: React.Dispatch<(prev: MailT[]) => MailT[]>
	selectedMails: SelectedMailT[]
	marksOfSelectedMails: string[]
	setSelectedMails: React.Dispatch<((prev: SelectedMailT[]) => SelectedMailT[]) | SelectedMailT[]>
	setMarksOfSelectedMail: React.Dispatch<((prev: string[]) => string[]) | string[]>
}

export const MailsManager = ({ mails, setMails, setSelectedMails, selectedMails, setMarksOfSelectedMail, marksOfSelectedMails }:MailsManagerProps):React.JSX.Element => {
	return (
		<div className={cl['mails-list-header']}>
			<MailsManagerControl
				mails={mails}
				setMails={setMails}
				setMarksOfSelectedMail={setMarksOfSelectedMail}
				marksOfSelectedMails={marksOfSelectedMails}
				setSelectedMails={setSelectedMails}
				selectedMails={selectedMails}
			/>
			<MailsFilter className={cl['mails-list-header__filter']} />
		</div>
	);
};