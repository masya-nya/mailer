import React from 'react';
import cl from './UserRightsTableItem.module.scss';
import { MailBox, ManagerWithGroupNameT } from '../../../../../shared/lib';
import UserRightsTableCheckbox from '../user-rights-table-checkbox/UserRightsTableCheckbox';

type UserRightsTableItemProps = {
	mailboxes: MailBox[]
	manager: ManagerWithGroupNameT
	setMailBoxesHandler: (value: boolean, managerId: string, mailbox: MailBox) => void
}

const UserRightsTableItem = ({ mailboxes, manager, setMailBoxesHandler }: UserRightsTableItemProps): React.JSX.Element => {
	return (
		<div className={cl['user-rights-table-item']}>
			<div className={cl['user-rights-table-item__manager']} title={`${manager.title}(${manager.group_name})`}>
				{ manager.title } ({ manager.group_name })
			</div>

			{
				mailboxes.map(mailbox =>
					<UserRightsTableCheckbox mailbox={mailbox} managerId={manager.id} setMailBoxesHandler={setMailBoxesHandler} key={mailbox.email} />
				)
			}
		</div>
	);
};

export default UserRightsTableItem;
