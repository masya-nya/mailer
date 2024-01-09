import { CSSProperties, FC, useContext } from 'react';
import cl from './EmailsNavigation.module.scss';
import { observer } from 'mobx-react-lite';
import { GroupedNavlinks } from 'src/shared/UI/navlinks';
import { AddNewEmailButton } from './components/add-new-email-button/AddNewEmailButton';
import { AccountUserContext } from 'src/entities/account-user/model/context/AccountUserContext';
import { formatingEmailForNavLinks } from './lib/helpers/formatingEmailForNavLinks';

interface EmailsNavigationProps {
	className?: string
	style?: CSSProperties
}

export const EmailsNavigation:FC<EmailsNavigationProps> = observer(() => {
	const { store: accountUserStore } = useContext(AccountUserContext);
	const emailsNavLinks = formatingEmailForNavLinks(accountUserStore.emails);

	return (
		<div className={cl['emails-navigation']}>
			<GroupedNavlinks title={'Почтовые ящики'} links={emailsNavLinks}/>
			<AddNewEmailButton />
		</div>
	);
});