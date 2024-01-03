import { MailSend } from 'src/widgets/mail-send';
import { MailsListWrapper } from '../../components/mails-list-wrapper/MailsListWrapper';
import MailViewWrapper from 'src/widgets/mail/mail-view/MailViewWrapper';

export const MailModuleRoutes = {
	'mails-list': <MailsListWrapper />,
	'mail-view': <MailViewWrapper />,
	'mail-send': <MailSend />,
};
