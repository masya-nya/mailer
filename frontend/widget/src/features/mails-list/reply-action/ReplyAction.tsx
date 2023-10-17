import React from 'react';
import cl from './ReplyAction.module.scss';
import { sendMailStore } from '../../../entities/mail-send';
import { SelectedMailT, useMails } from '../../../entities/mails-list';
import { mailStore, MailContentRoutes } from '../../../modules/mail-module';
import { COLORS } from '../../../shared/lib';
import { ReplyArrowSvg } from '../../../shared/svg';

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
		mailStore.mailContentRoute = MailContentRoutes.mailSending;
	};

	return (
		<div onClick={ReplyMsgsHandler} className={cl['reply-action']}>
			<ReplyArrowSvg width='20' height='20' color={COLORS.font_base_color} />
			<div className={cl['reply-action__text']}>
				Ответить
			</div>
		</div>
	);
};