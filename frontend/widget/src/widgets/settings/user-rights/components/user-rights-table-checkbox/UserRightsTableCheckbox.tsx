import React, { useCallback } from 'react';
import cl from './UserRightsTableCheckbox.module.scss';
import { Checkbox } from '../../../../../shared/UI';
import { MailBox } from '../../../../../shared/lib';

type UserRightsTableCheckboxProps = {
	mailbox: MailBox
	managerId: string
	setMailBoxesHandler: (value: boolean, managerId: string, mailbox: MailBox) => void
}

const UserRightsTableCheckbox = ({ mailbox, managerId, setMailBoxesHandler }:UserRightsTableCheckboxProps):React.JSX.Element => {
	const isChecked = useCallback(():boolean => {
		return mailbox.unallowedManagers.includes(managerId);
	}, [mailbox, managerId]);

	const userRightChange = (event: React.SyntheticEvent, value: boolean):void => {
		event.stopPropagation();
		setMailBoxesHandler(value, managerId, mailbox);
	};

	return (
		<div key={mailbox.email} className={cl['user-rights-table-checkbox']}>
			<Checkbox type="cross" checked={isChecked()} checkedHandler={userRightChange} />
		</div>
	);
};

export default UserRightsTableCheckbox;
