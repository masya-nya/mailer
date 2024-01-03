import React, { useContext, DragEvent, FocusEvent } from 'react';
import cl from './RolesListRole.module.scss';
import { CSSProperties } from 'react';
import { UserPopulateI } from 'src/entities/user';
import { RoleI } from 'src/entities/roles/model/schemas/role.schema';
import { RolesListUser } from '../roles-list-user/RolesListUser';
import {
	RolesContext,
	RolesRights,
	RolesRightsT,
	RolesRightsTranslate,
} from 'src/entities/roles';
import { Button, Input, Select } from 'antd';
import { SelectOptionsT } from 'src/shared/lib';

type RolesListRoleProps = {
	role: RoleI<UserPopulateI>;
	className?: string;
	style?: CSSProperties;
};

export const RolesListRole = ({
	role,
	...props
}: RolesListRoleProps): React.JSX.Element => {
	const { store: rolesStore } = useContext(RolesContext);

	function dragOverHandler(event: DragEvent<HTMLDivElement>): void {
		event.preventDefault();
		console.log('dragOverHandler');
	}

	function dropRoleHandler(
		event: DragEvent<HTMLDivElement>,
		role: RoleI<UserPopulateI>
	): void {
		event.preventDefault();
		if (
			rolesStore.currentDragUser &&
			rolesStore.currentDragRole &&
			rolesStore.roles &&
			!role.users.length
		) {
			role.users.push(rolesStore.currentDragUser);
			const dropUserIndex = rolesStore.currentDragRole.users.indexOf(
				rolesStore.currentDragUser
			);
			rolesStore.currentDragRole.users.splice(dropUserIndex, 1);
			rolesStore.roles = rolesStore.roles.map(r => {
				if (r._id === rolesStore.currentDragRole?._id) {
					return rolesStore.currentDragRole;
				}
				if (r._id === role._id) {
					return role;
				}
				return r;
			});
		}
	}

	const handleChange = (updatedRoles: RolesRightsT[]): void => {
		const updatedRole = { ...role, rights: updatedRoles };
		rolesStore.updateRole(updatedRole);
	};

	const deleteRole = async (): Promise<void> => {
		rolesStore.deleteRole(role);
	};

	const changeRoleNameHandler = (
		event: FocusEvent<HTMLInputElement>
	): void => {
		const updatedRoleName = event.target.value;
		const updatedRole = { ...role, name: updatedRoleName };
		rolesStore.updateRole(updatedRole);
	};

	const rightOptions: SelectOptionsT[] = RolesRights.map(rightKey => ({
		value: rightKey,
		label: RolesRightsTranslate[rightKey],
	}));

	return (
		<div
			{...props}
			className={cl['roles-list-role']}
			onDragOver={dragOverHandler}
			onDrop={e => dropRoleHandler(e, role)}
		>
			<div className={cl['roles-list-role__heading']}>
				<div className={cl['roles-list-role__title']}>
					<div className={cl['roles-list-role__name']}>
						<Input
							onBlur={changeRoleNameHandler}
							defaultValue={role.name}
							placeholder="Название роли"
							bordered={false}
						/>
					</div>
					<div className={cl['roles-list-role__actions']}>
						{
							!Boolean(role.systemName) &&
							<Button className={cl['roles-list__save-btn']} danger size='small' onClick={deleteRole} type='primary'>Удалить</Button>
						}
					</div>
				</div>
				<div className={cl['roles-list-role__rights']}>
					<Select
						mode="tags"
						style={{ width: '100%' }}
						onChange={handleChange}
						defaultValue={role.rights}
						tokenSeparators={[',']}
						options={rightOptions}
						placeholder="Выберите необходимые права для роли"
						maxTagCount="responsive"
					/>
				</div>
			</div>
			<div className={cl['roles-list-role__list']}>
				{Boolean(role.users.length) ? (
					<>
						{role.users.map(user => (
							<RolesListUser
								user={user}
								role={role}
								key={user.email}
							/>
						))}
					</>
				) : (
					<span className={cl['roles-list-role__empty']}>
						Список пользователей пуст
					</span>
				)}
			</div>
		</div>
	);
};
