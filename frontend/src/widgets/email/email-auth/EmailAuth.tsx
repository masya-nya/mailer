import { CSSProperties, FC } from 'react';
import cl from './EmailAuth.module.scss';
import { AuthButton } from 'src/features/email';
import { MAILS_SERVICES_CONF } from './lib/config';

interface EmailAuthProps {
	className?: string;
	style?: CSSProperties;
}

export const EmailAuth: FC<EmailAuthProps> = () => {
	return (
		<div className={cl['email-auth']}>
			<div className={cl['email-auth__header']}>
				Выберите способ авторизации:
			</div>
			<div className={cl['email-auth__btns']}>
				{MAILS_SERVICES_CONF.map(mail => (
					<AuthButton
						type={mail.value}
						title={mail.title}
						icon={mail.icon}
						key={mail.value}
					/>
				))}
			</div>
		</div>
	);
};
