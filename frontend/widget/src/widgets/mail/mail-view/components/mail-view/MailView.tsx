import React, { useState } from 'react';
import cl from './MailView.module.scss';
import parse from 'html-react-parser';
import { sendMailStore } from '../../../../../entities/mail-send';
import { FLAGS, MailT } from '../../../../../entities/mails-list';
import { MarkType } from '../../../../../entities/mark';
import { ButtonReply } from '../../../../../shared/UI';
import { ImportantMailChecked, UnreadMailChecked } from '../../../../../features/mail';
import { MailSend } from '../../../../mail-send';
import MailHeader from '../mail-header/MailHeader';
import MailMarks from '../mail-marks/MailMarks';
import MailActionMenu from '../mail-action-menu/MailActionMenu';
import MailAttachments from '../mail-attachments/MailAttachments';

type MailViewProps = {
	mail: MailT;
	mailMarks: MarkType[];
	updateMarks: (markId: string, isRemoving: boolean) => void
}

export const MailView = ({ mail, mailMarks, updateMarks }:MailViewProps): React.JSX.Element => {
	const [isFlagged, setIsFlagged] = useState(mail.flags.includes(FLAGS.important));
	const [isSeen, setIsSeen] = useState(mail.flags.includes(FLAGS.seen));
	const [isReply, setIsReply] = useState(false);

	const seenHandler = (): void => {
		setIsSeen((prev) => !prev);
	};

	const flaggedHandler = (): void => {
		setIsFlagged((prev) => !prev);
	};

	const replyHandler = ():void => {
		sendMailStore.mailTo = [mail!.from.value[0].address];
		setIsReply(prev => !prev);
	};

	return (
		<>
			<MailActionMenu
				className={cl['mail-view__action-menu']}
				mail={mail}
				mutateMarks={updateMarks}
				mutateSeen={(value) => setIsSeen(value)}
			/>
			<div className={cl['mail-view__content']}>
				<h2 className={cl['mail-view__subject']}>
					<ImportantMailChecked msgId={{ msgId: mail.msgId, msgSeq: mail.msgSeq }} checked={isFlagged} mutateHandler={flaggedHandler}/>
					<UnreadMailChecked msgId={{ msgId: mail.msgId, msgSeq: mail.msgSeq }} checked={!isSeen} mutateHandler={seenHandler}/>
					{mail?.subject || '(Без темы)'}
				</h2>
				{ Boolean(mailMarks.length) && <MailMarks mailMarks={mailMarks}/> }
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
				<ButtonReply className={cl['mail-view__reply']} onClickHandler={replyHandler}/>

				{
					isReply && <MailSend />
				}
			</div>
		</>
	);
};