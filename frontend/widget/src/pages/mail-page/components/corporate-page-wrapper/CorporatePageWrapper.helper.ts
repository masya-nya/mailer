import { MailBox, USER_ID } from '../../../../shared/lib';

export const filterUnallowedEmails = (mails: MailBox[] | undefined):MailBox[] => {
	if (!mails) return [];
	return mails.filter(mail => !mail.unallowedManagers.includes(USER_ID.toString()));
};