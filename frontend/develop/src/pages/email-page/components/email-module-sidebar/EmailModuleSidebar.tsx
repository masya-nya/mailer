import { CSSProperties, FC, useContext } from 'react';
import cl from './EmailModuleSidebar.module.scss';
import { Button } from 'antd';
import { MailBoxes } from 'src/widgets/mail-boxes';
import { EmailContext } from 'src/entities/email';
import { MailContentRoutes } from 'src/entities/email/lib/consts';

interface EmailModuleSidebarProps {
	className?: string;
	style?: CSSProperties;
}

export const EmailModuleSidebar: FC<EmailModuleSidebarProps> = () => {
	const { store: emailStore } = useContext(EmailContext);
	return (
		<div className={cl['emailmodule-sidebar']}>
			<div className={cl['emailmodule-sidebar__write']}>
				<Button
					className={cl['emailmodule-sidebar__write-btn']}
					type="primary"
					size="large"
					onClick={() => emailStore.mailContentRoute = MailContentRoutes.mailSending}
				>
					Написать сообщение
				</Button>
			</div>
			<div className={cl['emailmodule-sidebar__base-types']}>
				<MailBoxes />
			</div>
		</div>
	);
};
