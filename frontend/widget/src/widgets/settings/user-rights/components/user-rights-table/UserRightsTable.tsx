import React, { useState } from 'react';
import cl from './UserRightsTable.module.scss';
import UserRightsTableHeading from '../user-rights-table-heading/UserRightsTableHeading';
import UserRightsTableItem from '../user-rights-table-item/UserRightsTableItem';
import { mergeManagersAndGroups } from './UserRightsTable.helper';
import { MailBox, ManagerWithGroupNameT } from '../../../../../shared/lib';

type UserRightsTableProps = {
	mailBoxes: MailBox[]
	setMailBoxesHandler: (value: boolean, managerId: string, mailbox: MailBox) => void
}

const UserRightsTable = ({ mailBoxes, setMailBoxesHandler }:UserRightsTableProps):React.JSX.Element => {
	const managersWithGroups = mergeManagersAndGroups();
	const [filteredManagers, setFilteredManagers] = useState<ManagerWithGroupNameT[]>(managersWithGroups);

	const filterManagers = (event: React.ChangeEvent<HTMLInputElement>):void => {
		const searchValue = event.target.value;
		setFilteredManagers(managersWithGroups.filter(manager =>
			(manager.group_name.toLowerCase().includes(searchValue.toLowerCase()) || manager.title.toLowerCase().includes(searchValue.toLowerCase()))
		));
	};
	return (
		<div className={cl['user-rights-table']}>
			<UserRightsTableHeading mailboxes={mailBoxes} searchHandler={filterManagers} />
			{
				Object.values(filteredManagers).map(manager =>
					<UserRightsTableItem mailboxes={mailBoxes} setMailBoxesHandler={setMailBoxesHandler} manager={manager} key={manager.id} />
				)
			}
		</div>
	);
};

export default UserRightsTable;
