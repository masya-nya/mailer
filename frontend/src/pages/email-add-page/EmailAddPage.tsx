import { CSSProperties, FC } from 'react';
import cl from './EmailAddPage.module.scss';
import { EmailAuth } from 'src/widgets/email';

interface EmailAddPageProps {
	className?: string
	style?: CSSProperties
}

export const EmailAddPage:FC<EmailAddPageProps> = () => {
	return (
		<div className={cl['email-add-page']}>
			<EmailAuth />
		</div>
	);
};