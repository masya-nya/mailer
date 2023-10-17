import React, { useEffect, useState } from 'react';
import cl from './MailsManagerControl.module.scss';
import { MailT, SelectedMailT, useMails } from '../../../../../entities/mails-list';
import { Checkbox } from '../../../../../shared/UI';
import { MailsManagerActions } from '../mails-manager-actions/MailsManagerActions';

type MailsManagerControlProps = {
	mails: MailT[]
	setMails: React.Dispatch<(prev: MailT[]) => MailT[]>
	selectedMails: SelectedMailT[]
	marksOfSelectedMails: string[]
	setSelectedMails: React.Dispatch<((prev: SelectedMailT[]) => SelectedMailT[]) | SelectedMailT[]>
	setMarksOfSelectedMail: React.Dispatch<((prev: string[]) => string[]) | string[]>
}

export const MailsManagerControl = ({ mails, setMails, setSelectedMails, selectedMails, setMarksOfSelectedMail, marksOfSelectedMails }:MailsManagerControlProps): React.JSX.Element => {
	const [isChecked, setIsChecked] = useState(false);
	const { mutate: mutateMails } = useMails();

	const setIsCheckedHandler = (event:React.SyntheticEvent, value:boolean):void => {
		event.stopPropagation();
		setIsChecked(value);
		const selectedMailsIds:SelectedMailT[] = [];
		const marksOfSelectedMailsIds:string[] = [];
		setMails(prev => prev.map(mail => {
			value && selectedMailsIds.push({ msgId: mail.msgId, msgSeq: mail.msgSeq });
			value && marksOfSelectedMailsIds.push(...mail.marks);
			return { ...mail, checked: value };
		}));
		if (value) {
			setSelectedMails(selectedMailsIds);
			setMarksOfSelectedMail(marksOfSelectedMailsIds);
		} else {
			setSelectedMails([]);
			setMarksOfSelectedMail([]);
		}
	};

	useEffect(() => {
		selectedMails.length === mails.length && mails.length ? setIsChecked(true) : setIsChecked(false);
	}, [selectedMails]);

	return (
		<div className={cl['mails-manager']}>
			<div className={cl['mails-manager__checkbox']}>
				<Checkbox checked={isChecked} checkedHandler={setIsCheckedHandler} />
			</div>
			<MailsManagerActions selectedMails={selectedMails} marksOfSelectedMails={marksOfSelectedMails} mutateMarks={() => mutateMails()} mutateSeen={() => mutateMails()}/>
		</div>
	);
};