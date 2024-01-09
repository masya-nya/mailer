import { CSSProperties, FC, useContext } from 'react';
import cl from './EmailModuleContent.module.scss';
import { observer } from 'mobx-react-lite';
import { EmailContext } from 'src/entities/email';
import { MailModuleRoutes } from '../../lib/config';

interface EmailModuleContentProps {
	className?: string
	style?: CSSProperties
}

export const EmailModuleContent:FC<EmailModuleContentProps> = observer(() => {
	const { store: emailStore } = useContext(EmailContext);
	return (
		<div className={cl['email-module-content']}>
			{
				MailModuleRoutes[emailStore.mailContentRoute]
			}
		</div>
	);
});