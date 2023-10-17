import React from 'react';
import MailViewWrapper from '../../../../widgets/mail/mail-view/MailViewWrapper';
import { MailsListWrapper } from '../../components/mails-list-wrapper/MailsListWrapper';
import { MailSend } from '../../../../widgets/mail-send';

export enum DefaultFilterValues {
	page = 1,
	limit = 30
}

export const MailModuleRoutes = {
	'mails-list': <MailsListWrapper />,
	'mail-view': <MailViewWrapper />,
	'mail-send': <MailSend />
};