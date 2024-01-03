import React, { useEffect, useState } from 'react';
import cl from './MailsManagerControl.module.scss';
import { MailT, SelectedMailT, useMails } from '../../../../../entities/mails-list';
import { Checkbox } from '../../../../../shared/UI';
import { MailsManagerActions } from '../mails-manager-actions/MailsManagerActions';

type MailsManagerControlProps = {
	mails: MailT[]
	setMails: React.Dispatch<(prev: MailT[]) => MailT[]>
	selectedMails: SelectedMailT[]
	setSelectedMails: React.Dispatch<((prev: SelectedMailT[]) => SelectedMailT[]) | SelectedMailT[]>
}

export const MailsManagerControl = ({ mails, setMails, setSelectedMails, selectedMails }:MailsManagerControlProps): React.JSX.Element => {
	const [isChecked, setIsChecked] = useState(false);
	const { mutate: mutateMails } = useMails();

	const setIsCheckedHandler = (event:React.SyntheticEvent, value:boolean):void => {
		event.stopPropagation();
		setIsChecked(value);
		const selectedMailsIds:SelectedMailT[] = [];
		setMails(prev => prev.map(mail => {
			value && selectedMailsIds.push({ msgId: mail.msgId, msgSeq: mail.msgSeq });
			return { ...mail, checked: value };
		}));
		if (value) {
			setSelectedMails(selectedMailsIds);
		} else {
			setSelectedMails([]);
		}
	};

	useEffect(() => {
		selectedMails.length === mails.length && mails.length ? setIsChecked(true) : setIsChecked(false);
	}, [selectedMails, mails]);

	return (
		<div className={cl['mails-manager']}>
			<div className={cl['mails-manager__checkbox']}>
				<Checkbox checked={isChecked} checkedHandler={setIsCheckedHandler} />
			</div>
			<MailsManagerActions selectedMails={selectedMails} mutateSeen={() => mutateMails()}/>
		</div>
	);
};