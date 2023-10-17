import React from 'react';
import cl from './UserRightsTableHeading.module.scss';
import { Avatar, Input } from '../../../../../shared/UI';
import { MailBox } from '../../../../../shared/lib';

type UserRightsTableHeadingProps = {
	mailboxes: MailBox[]
	searchHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UserRightsTableHeading = ({ mailboxes, searchHandler }: UserRightsTableHeadingProps): React.JSX.Element => {
	return (
		<div className={cl['user-rights-table-heading']}>
			<div className={cl['user-rights-table-heading__managers']}>
				<Input style={{ width: '100%', border: 'none', fontSize: '18px' }} type='text' onChangeHandler={searchHandler} placeholder='Менеджер или отдел' />
			</div>
			{
				mailboxes.map(mailbox =>
					<div key={mailbox.email} className={cl['user-rights-table-heading__item']}>
						<Avatar style={{ width: '45px', height: '45px' }} src={mailbox.photo} title={mailbox.email} />
						<div key={mailbox.email} className={cl['user-rights-table-heading__item--inner']}>
							{ mailbox.email }
						</div>
					</div>
				)
			}

		</div>
	);
};

export default UserRightsTableHeading;
