import { ROUTER_ROTES } from 'src/app/router/config';
import { EmailI } from 'src/entities/email';
import { AvatarImg } from 'src/shared/UI';
import { NavlinkI } from 'src/shared/UI/navlinks';
const { LAYOUT: { EMAIL } } =ROUTER_ROTES;

export const formatingEmailForNavLinks = (emails: EmailI[]): NavlinkI[] => {
	return emails.map(email => {
		return {
			to: `${EMAIL.BASE}/${email.email}`,
			title: email.email,
			icon: <AvatarImg src={email.photo} />
		};
	});
};
