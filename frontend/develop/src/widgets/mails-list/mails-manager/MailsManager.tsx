import React from 'react';
import cl from './MailsManager.module.scss';
import { MailT, SelectedMailT } from '../../../entities/mails-list';
import { MailsManagerControl } from './components/mails-manager-control/MailsManagerControl';

type MailsManagerProps = {
	mails: MailT[]
	setMails: React.Dispatch<(prev: MailT[]) => MailT[]>
	selectedMails: SelectedMailT[]
	setSelectedMails: React.Dispatch<((prev: SelectedMailT[]) => SelectedMailT[]) | SelectedMailT[]>
}

export const MailsManager = ({ mails, setMails, setSelectedMails, selectedMails }:MailsManagerProps):React.JSX.Element => {
	return (
		<div className={cl['mails-list-header']}>
			<MailsManagerControl
				mails={mails}
				setMails={setMails}
				setSelectedMails={setSelectedMails}
				selectedMails={selectedMails}
			/>
		</div>
	);
};