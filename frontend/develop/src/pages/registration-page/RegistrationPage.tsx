import { CSSProperties, FC } from 'react';
import cl from './RegistrationPage.module.scss';
import { RegistrationForm } from 'src/features/auth/registration-form';

interface RegistrationPageProps {
	className?: string
	style?: CSSProperties
}

export const RegistrationPage:FC<RegistrationPageProps> = () => {
	return (
		<div className={cl['registration-page']}>
			<RegistrationForm />
		</div>
	);
};