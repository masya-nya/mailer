import React from 'react';
import cl from './MailsManagerActions.module.scss';
import cn from 'classnames';
import { SelectedMailT } from '../../../../../entities/mails-list';
import { FolderMovementModule } from '../../../../folder';
import { MarksAdding } from '../../../../mark';
import { ForwardAction, DeleteAction, SpamAction, ReadUnreadAction, AmoAction, ReplyAction } from '../../../../../features/mails-list';

type MailsManagerActionsProps = {
	selectedMails: SelectedMailT[]
	marksOfSelectedMails: string[]
    mutateMarks: (option: string, isRemove: boolean) => void
    mutateSeen: (value: boolean) => void
}

export const MailsManagerActions = ({ selectedMails, marksOfSelectedMails, mutateMarks, mutateSeen }:MailsManagerActionsProps):React.JSX.Element => {
	return (
		<div className={cn(cl['mails-manager__actions'], { [cl['mails-manager__actions--untouchable']]: !selectedMails.length })}>
			<ForwardAction selectedMails={selectedMails} />
			<ReplyAction selectedMails={selectedMails} />
			<DeleteAction selectedMails={selectedMails} />
			<SpamAction selectedMails={selectedMails} />
			<ReadUnreadAction selectedMails={selectedMails} mutateSeen={mutateSeen}/>
			<MarksAdding selectedMails={selectedMails} marksOfSelectedMails={marksOfSelectedMails} mutateMarks={mutateMarks}/>
			<FolderMovementModule selectedMails={selectedMails} />
			<AmoAction selectedMails={selectedMails} />
		</div>
	);
};