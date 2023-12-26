import React from 'react';
import cl from './RolesListRole.module.scss';
import { CSSProperties } from 'react';
import { UserPopulateI } from 'src/entities/user';
import { RoleI } from 'src/entities/roles/model/schemas/role.schema';
import { RolesListUser } from '../roles-list-user/RolesListUser';

type RolesListRoleProps = {
	role: RoleI<UserPopulateI>
	className?: string
	style?: CSSProperties
}

export const RolesListRole = ({ role, ...props }: RolesListRoleProps): React.JSX.Element => {
	return (
		<div {...props} className={cl['roles-list-role']}>
			<div className={cl['roles-list-role__title']}>{ role.name }</div>
			<div className={cl['roles-list-role__list']}>
				{
					role.users.map(user => (
						<RolesListUser user={user} key={user.email} />
					))
				}
			</div>
		</div>
	);
};