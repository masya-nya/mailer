import React, { useContext, useEffect, CSSProperties, useState } from 'react';
import cl from './RolesList.module.scss';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { AccountContext } from 'src/entities/account';
import { RolesContext, getNewRolePattern } from 'src/entities/roles';
import { Loader } from 'src/shared/UI';
import { RolesListRole } from './components/roles-list-role/RolesListRole';
import { RoleCreate } from './components/role-create/RoleCreate';
import { mutate } from 'swr';
import { SWRKeys } from 'src/shared/lib';
import { accountRolesStore } from 'src/entities/roles/model/store/roles.store';
import { AuthContext } from 'src/entities/auth';

type RolesListProps = {
	className?: string
	style?: CSSProperties
}

export const RolesList = observer(({ ...props }: RolesListProps): React.JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { store: accountStore } = useContext(AccountContext);
	const { store: rolesStore } = useContext(RolesContext);
	const { store: authStore } = useContext(AuthContext);

	const saveHandler = async ():Promise<void> => {
		console.log(rolesStore.roles);
		await rolesStore.sendUpdateRoles(accountStore.accountId);
		await mutate([SWRKeys.account_user, authStore.user!._id, accountStore.accountId]);
	};

	const addNewRole = ():void => {
		const newRole = getNewRolePattern(accountStore.accountId);
		rolesStore.addRole(newRole);
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const roles = await accountRolesStore.getAccountRoles(accountStore.accountId);
			rolesStore.roles = roles;
			setIsLoading(false);
		})();
	}, [accountStore.accountId, rolesStore]);

	if(isLoading || !rolesStore.roles) {
		return <Loader />;
	}

	return (
		<div {...props} className={cl['roles-list']}>
			<div className={cl['roles-list__heading']}>
				<div className={cl['roles-list__title']}>Настройка ролей</div>
			</div>
			<div className={cl['roles-list__body']}>
				{
					rolesStore.roles.map(role => (
						<RolesListRole role={role} key={role._id} />
					))
				}
				<RoleCreate clickHandler={addNewRole} />
			</div>
			<div className={cl['roles-list__btns']}>
				<Button className={cl['roles-list__save-btn']} size='large' onClick={saveHandler} type='primary'>Сохранить</Button>
			</div>
		</div>
	);
});