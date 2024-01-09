import React from 'react';
import cl from './ReplyAction.module.scss';
import { sendMailStore } from '../../../entities/mail-send';
import { SelectedMailT, useMails } from '../../../entities/mails-list';
import { ReplyArrowSvg } from '../../../shared/svg';
import { SWGColors } from 'src/shared/lib';
import { emailStore } from 'src/entities/email';
import { MailContentRoutes } from 'src/entities/email/lib/consts';

type ReplyActionProps = {
	selectedMails: SelectedMailT[]
}

export const ReplyAction = ({ selectedMails }:ReplyActionProps):React.JSX.Element => {
	const { data: mails } = useMails();
	const ReplyMsgsHandler = ():void => {
		const replyTo:string[] = [];
		selectedMails.forEach(({ msgId, msgSeq }) => {
			const mail = mails?.mails.find(mail => (mail.msgId === msgId && mail.msgSeq === msgSeq));
			if (mail) {
				const address = mail.from.value[0].address;
				!replyTo.includes(address) && replyTo.push(address);
			}
		});
		sendMailStore.mailTo = replyTo;
		emailStore.mailContentRoute = MailContentRoutes.mailSending;
	};

	return (
		<div onClick={ReplyMsgsHandler} className={cl['reply-action']}>
			<ReplyArrowSvg width='20px' height='20px' color={SWGColors.grey} />
			<div className={cl['reply-action__text']}>
				Ответить
			</div>
		</div>
	);
};