import React from 'react';
import cl from './ForwardAction.module.scss';
import { sendMailStore } from '../../../entities/mail-send';
import { SelectedMailT, ServerMailT, useMails } from '../../../entities/mails-list';
import { mailStore, MailContentRoutes } from '../../../modules/mail-module';
import { COLORS } from '../../../shared/lib';
import { ForwardSvg } from '../../../shared/svg';

type ForwardActionProps = {
	selectedMails: SelectedMailT[]
}

export const ForwardAction = ({ selectedMails }:ForwardActionProps):React.JSX.Element => {
	const { data: mails } = useMails();
	const forwardMsgsHandler = ():void => {
		const references:ServerMailT[] = [];
		selectedMails.forEach(({ msgId, msgSeq }) => {
			const mail = mails?.mails.find(mail => (mail.msgId === msgId && mail.msgSeq === msgSeq));
			if (mail) references.push({ ...mail });
		});
		sendMailStore.references = references;
		mailStore.mailContentRoute = MailContentRoutes.mailSending;
	};

	return (
		<div onClick={forwardMsgsHandler} className={cl['forward-action']}>
			<ForwardSvg width='20' height='20' color={COLORS.font_base_color} />
			<div className={cl['forward-action__text']}>
				Переслать
			</div>
		</div>
	);
};