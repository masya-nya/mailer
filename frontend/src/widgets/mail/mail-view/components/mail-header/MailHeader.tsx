import React from 'react';
import cl from './MailHeader.module.scss';
import cn from 'classnames';
import { FromToT } from '../../../../../entities/mails-list';
import { AvatarStub } from '../../../../../shared/UI';
import MailReceivers from '../mail-receivers/MailReceivers';

type MailHeaderProps = {
	date: number;
	senders: FromToT;
	receivers: FromToT;
	className?: string;
}

const MailHeader = ({ className, date, receivers, senders: { value: [sender] } }:MailHeaderProps): React.JSX.Element => {
	return (
		<div className={cn(cl['mail-header'], className)}>
			<div className={cl['mail-header__sender-avatar']}>
				<AvatarStub
					name={sender.name}
					address={sender.address}
					style={{ height: '40px', width: '40px' }}
				/>
			</div>
			<div className={cl['mail-header__content']}>
				<div className={cl['mail-header__send-info']}>
					<span className={cl['send-info__sender-name']}>{sender.name}</span>
					<span className={cl['send-info__sender-address']}>{sender.address}</span>
					<span className={cl['send-info__send-date']}>{new Date(date).toLocaleDateString()}</span>
				</div>
				<div className={cl['mail-header__mail-receivers']}>
					<MailReceivers receivers={receivers}/>
				</div>
			</div>
		</div>
	);
};

export default MailHeader;