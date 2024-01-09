import { CSSProperties, FC, useContext, useEffect } from 'react';
import cl from './EmailPage.module.scss';
import { useParams } from 'react-router-dom';
import { EmailContext } from 'src/entities/email';
import { EmailModule } from './components/email-module/EmailModule';
import { useMails } from 'src/entities/mails-list';
import { useSWRConfig } from 'swr';

interface EmailPageProps {
	className?: string
	style?: CSSProperties
}

export const EmailPage:FC<EmailPageProps> = () => {
	const { mutate } = useMails();
	const { cache } = useSWRConfig();
	const { email } = useParams();
	const { store: emailStore } = useContext(EmailContext);
	emailStore.email = email || null;
	console.log(email);

	useEffect(() => {
		cache.delete('getMails');
		mutate();
	}, [email, mutate, cache]);

	return (
		<div className={cl['email-page']}>
			<EmailModule />
		</div>
	);
};