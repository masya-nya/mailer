import React, { useContext, useState } from 'react';
import { CSSProperties } from 'react';
import { Button } from 'antd';
import { UserI } from 'src/entities/user/model/schemas/user.schema';
import { AuthContext } from 'src/entities/auth';

type TestProps = {
	className?: string
	style?: CSSProperties
}

export const Test = ({ ...props }: TestProps): React.JSX.Element => {
	const { store } = useContext(AuthContext);
	const [users, setUsers] = useState<UserI[]>([]);
	const loadUsers = async ():Promise<void> => {
		const users = await store.getUsers();
		setUsers(users);
	};
	return (
		<div {...props}>
			<Button type="primary" onClick={loadUsers}>Подгрузить пользователей</Button>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{
					users.map(user => <span key={user._id}>{user.email}, { user._id }</span>)
				}
			</div>
		</div>
	);
};