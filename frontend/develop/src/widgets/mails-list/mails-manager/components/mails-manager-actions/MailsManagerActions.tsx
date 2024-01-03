import React from 'react';
import cl from './MailsManagerActions.module.scss';
import cn from 'classnames';
import { SelectedMailT } from '../../../../../entities/mails-list';
import { DeleteAction, SpamAction, ReadUnreadAction, ReplyAction } from '../../../../../features/mails-list';

type MailsManagerActionsProps = {
	selectedMails: SelectedMailT[]
    mutateSeen: (value: boolean) => void
}

export const MailsManagerActions = ({ selectedMails, mutateSeen }:MailsManagerActionsProps):React.JSX.Element => {
	return (
		<div className={cn(cl['mails-manager__actions'], { [cl['mails-manager__actions--untouchable']]: !selectedMails.length })}>
			<ReplyAction selectedMails={selectedMails} />
			<DeleteAction selectedMails={selectedMails} />
			<SpamAction selectedMails={selectedMails} />
			<ReadUnreadAction selectedMails={selectedMails} mutateSeen={mutateSeen}/>
		</div>
	);
};