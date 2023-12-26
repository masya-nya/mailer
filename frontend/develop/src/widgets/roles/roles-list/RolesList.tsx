import React, { useContext, useEffect } from 'react';
import cl from './RolesList.module.scss';
import { CSSProperties, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { AccountContext } from 'src/entities/account';
import { RoleI, useAccountRoles } from 'src/entities/roles';
import { Loader } from 'src/shared/UI';
import { RolesListRole } from './components/roles-list-role/RolesListRole';
import { UserPopulateI } from 'src/entities/user';

type RolesListProps = {
	className?: string
	style?: CSSProperties
}

export const RolesList = observer(({ ...props }: RolesListProps): React.JSX.Element => {
	const { store: accountStore } = useContext(AccountContext);
	const { data, isLoading, isValidating } = useAccountRoles(accountStore.accountId);
	const [roles, setRoles] = useState<RoleI<UserPopulateI>[]>([]);

	console.log('ROLES', data);
	useEffect(() => {
		if (data) {
			setRoles(data);
		}
	}, [data]);

	if(isLoading || isValidating || !roles) {
		return <Loader />;
	}

	return (
		<div {...props} className={cl['roles-list']}>
			<div className={cl['roles-list__title']}>Настройка ролей</div>
			<div className={cl['roles-list__body']}>
				{
					roles.map(role => (
						<RolesListRole role={role} key={role._id} />
					))
				}
			</div>
		</div>
	);
});