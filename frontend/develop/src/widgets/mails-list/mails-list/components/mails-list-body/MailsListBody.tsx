import React from 'react';
import cl from './MailsListBody.module.scss';
import { MailT, SelectedMailT } from '../../../../../entities/mails-list';
import MailsListEmpty from '../mails-list-empty/MailsListEmpty';
import { MailsListItem } from '../../..';

type MailsListBodyProps = {
	mails: MailT[] | []
	setMails: React.Dispatch<(prev: MailT[]) => MailT[]>
	setSelectedMails: React.Dispatch<(prev: SelectedMailT[]) => SelectedMailT[]>
	setMarksOfSelectedMail: React.Dispatch<((prev: string[]) => string[]) | string[]>
}

const MailsListBody = ({ mails, setMails, setSelectedMails, setMarksOfSelectedMail }: MailsListBodyProps): React.JSX.Element => {
	return (
		<div className={cl['mails-list-body']}>
			{
				mails.length
					? mails.map((mail, indx) =>
						<MailsListItem
							mail={mail}
							setMails={setMails}
							setMarksOfSelectedMail={setMarksOfSelectedMail}
							setSelectedMails={setSelectedMails}
							isLastOne={mails.length === indx}
							key={mail.msgSeq}
						/>)
					: <MailsListEmpty />
			}
		</div>
	);
};

export default MailsListBody;