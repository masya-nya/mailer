import React, { useState } from 'react';
import cl from './MailView.module.scss';
import parse from 'html-react-parser';
import { FLAGS, MailT } from '../../../../../entities/mails-list';
import { ImportantMailChecked, UnreadMailChecked } from '../../../../../features/mail';
import MailHeader from '../mail-header/MailHeader';
import MailActionMenu from '../mail-action-menu/MailActionMenu';
import MailAttachments from '../mail-attachments/MailAttachments';

type MailViewProps = {
	mail: MailT;
}

export const MailView = ({ mail }:MailViewProps): React.JSX.Element => {
	const [isFlagged, setIsFlagged] = useState(mail.flags.includes(FLAGS.important));
	const [isSeen, setIsSeen] = useState(mail.flags.includes(FLAGS.seen));

	const seenHandler = (): void => {
		setIsSeen((prev) => !prev);
	};

	const flaggedHandler = (): void => {
		setIsFlagged((prev) => !prev);
	};

	return (
		<>
			<MailActionMenu
				className={cl['mail-view__action-menu']}
				mail={mail}
				mutateSeen={(value) => setIsSeen(value)}
			/>
			<div className={cl['mail-view__content']}>
				<h2 className={cl['mail-view__subject']}>
					<ImportantMailChecked msgId={{ msgId: mail.msgId, msgSeq: mail.msgSeq }} checked={isFlagged} mutateHandler={flaggedHandler}/>
					<UnreadMailChecked msgId={{ msgId: mail.msgId, msgSeq: mail.msgSeq }} checked={!isSeen} mutateHandler={seenHandler}/>
					{mail?.subject || '(Без темы)'}
				</h2>
				<MailHeader
					className={cl['mail-view__mail-header']}
					date={mail.date}
					receivers={mail.to}
					senders={mail.from}
				/>
				{ Boolean(mail.attachments.length) && <MailAttachments attachments={mail.attachments}/> }
				<div className={cl['mail-view__mail-body']}>
					{
						mail.html
							? parse(mail.html.replace(/!important/gmi, ''))
							: mail.text
					}
				</div>
			</div>
		</>
	);
};