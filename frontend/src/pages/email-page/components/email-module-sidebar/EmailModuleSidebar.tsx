import { CSSProperties, FC, useContext, useMemo } from 'react';
import cl from './EmailModuleSidebar.module.scss';
import { Button } from 'antd';
import { MailBoxes } from 'src/widgets/mail-boxes';
import { EmailContext } from 'src/entities/email';
import { MailContentRoutes } from 'src/entities/email/lib/consts';
import { AccountUserContext } from 'src/entities/account-user/model/context/AccountUserContext';
import { observer } from 'mobx-react-lite';

interface EmailModuleSidebarProps {
	className?: string;
	style?: CSSProperties;
}

export const EmailModuleSidebar: FC<EmailModuleSidebarProps> = observer(() => {
	const { store: emailStore } = useContext(EmailContext);
	const { store: accountUserStore } = useContext(AccountUserContext);
	const isCanSend = useMemo(() => {
		return accountUserStore.accountUser?.roleRights.includes('can_send');
	}, [accountUserStore.accountUser?.roleRights]);
	return (
		<div className={cl['emailmodule-sidebar']}>
			{
				isCanSend &&
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
			}
			<div className={cl['emailmodule-sidebar__base-types']}>
				<MailBoxes />
			</div>
		</div>
	);
});
