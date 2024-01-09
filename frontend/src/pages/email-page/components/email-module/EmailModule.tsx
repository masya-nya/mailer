import { CSSProperties, FC } from 'react';
import cl from './EmailModule.module.scss';
import { EmailModuleSidebar } from '../email-module-sidebar/EmailModuleSidebar';
import { EmailModuleContent } from '../email-module-content/EmailModuleContent';

interface EmailModuleProps {
	className?: string
	style?: CSSProperties
}

export const EmailModule:FC<EmailModuleProps> = () => {
	return (
		<div className={cl['email-module']}>
			<EmailModuleSidebar />
			<EmailModuleContent />
		</div>
	);
};