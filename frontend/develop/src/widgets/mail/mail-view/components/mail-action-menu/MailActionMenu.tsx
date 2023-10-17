import React from 'react';
import cl from './MailActionMenu.module.scss';
import cn from 'classnames';
import { mailStore, MailContentRoutes } from '../../../../../modules/mail-module';
import { MailT } from '../../../../../entities/mails-list';
import { ButtonBack } from '../../../../../shared/UI';
import { MailsManagerActions } from '../../../../mails-list';

type MailActionMenuProps = {
	mail: MailT;
	mutateMarks: (option: string, isRemove: boolean) => void;
	mutateSeen: (value: boolean) => void;
	className?: string;
}

const MailActionMenu = ({ mail, className, mutateMarks, mutateSeen }:MailActionMenuProps): React.JSX.Element => {
	const backToMailList = (): void => {
		mailStore.mailContentRoute = MailContentRoutes.mailsList;
	};

	return (
		<div className={cn(cl['action-menu'], className)}>
			<ButtonBack onClick={backToMailList} className={cl['action-menu__back-btn']}/>
			<div className={cl['action-menu__vertical-line']}></div>
			<MailsManagerActions marksOfSelectedMails={mail.marks} selectedMails={[mail]} mutateMarks={mutateMarks} mutateSeen={mutateSeen}/>
		</div>
	);
};

export default MailActionMenu;