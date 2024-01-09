import React from 'react';
import cl from './MailActionMenu.module.scss';
import cn from 'classnames';
import { MailT } from '../../../../../entities/mails-list';
import { MailsManagerActions } from '../../../../mails-list';
import { Button } from 'antd';
import { emailStore } from 'src/entities/email';
import { MailContentRoutes } from 'src/entities/email/lib/consts';

type MailActionMenuProps = {
	mail: MailT;
	mutateSeen: (value: boolean) => void;
	className?: string;
}

const MailActionMenu = ({ mail, className, mutateSeen }:MailActionMenuProps): React.JSX.Element => {
	const backToMailList = (): void => {
		emailStore.mailContentRoute = MailContentRoutes.mailsList;
	};

	return (
		<div className={cn(cl['action-menu'], className)}>
			<Button type='primary' onClick={backToMailList} className={cl['action-menu__back-btn']}>Назад</Button>
			<div className={cl['action-menu__vertical-line']}></div>
			<MailsManagerActions selectedMails={[mail]} mutateSeen={mutateSeen}/>
		</div>
	);
};

export default MailActionMenu;