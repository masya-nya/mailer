import { CSSProperties, FC } from 'react';
import cl from './LoginPage.module.scss';
import { LoginForm } from 'src/features/auth';

interface LoginPageProps {
	className?: string
	style?: CSSProperties
}

export const LoginPage:FC<LoginPageProps> = () => {
	return (
		<div className={cl['login-page']}>
			<LoginForm />
		</div>
	);
};