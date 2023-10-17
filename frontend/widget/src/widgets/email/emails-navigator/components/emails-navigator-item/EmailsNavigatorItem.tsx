import React from 'react';
import cl from './EmailsNavigatorItem.module.scss';
import cn from 'classnames';
import { useSWRConfig } from 'swr';
import { observer } from 'mobx-react-lite';
import { mailStore } from '../../../../../modules/mail-module';
import { Avatar, ContextMenuWrapper, ContextMenu } from '../../../../../shared/UI';
import { useContextMenu } from '../../../../../shared/lib/hooks';
import { MailBox } from '../../../../../shared/lib/types';
import { emailsService } from '../../../../../entities/email';
import { createPortal } from 'react-dom';

type EmailsNavigatorItemProps = {
	mail: MailBox,
	selectedMail: MailBox | null,
	handleSetSelected: React.Dispatch<MailBox | null>
}

const EmailsNavigatorItem = observer(({ mail, selectedMail, handleSetSelected }: EmailsNavigatorItemProps): React.JSX.Element => {
	const { mutate } = useSWRConfig();
	const [isContextMenuOpen, setIsContextMenuOpen, points, contextMenuHandler] = useContextMenu();

	const deleteMail = async (): Promise<void> => {
		await emailsService.deleteMail(mail.email);
		setIsContextMenuOpen(false);
		mailStore.isCorporate ? mutate('getCorporateMails') : mutate('getPersonalMails');
	};

	return (
		<>
			<div
				onContextMenu={contextMenuHandler}
				onClick={() => handleSetSelected(mail)}
				className={cn(cl['emails-navigator__item'], { [cl['emails-navigator__item--active']]: selectedMail?.email === mail.email })}
			>
				<Avatar src={mail.photo} style={{}} />
				<div className={cl['emails-navigator__inner']}>
					{mail.email}
				</div>
			</div>
			{
				isContextMenuOpen &&
				createPortal(
					<ContextMenuWrapper isMenuOpenHandler={setIsContextMenuOpen} top={points.y} left={points.x}>
						<ContextMenu menuOptions={[
							{
								title: 'Удалить',
								handler: deleteMail,
								type: 'danger'
							}
						]}
						/>
					</ContextMenuWrapper>
					, document.body)
			}
		</>
	);
});

export default EmailsNavigatorItem;
