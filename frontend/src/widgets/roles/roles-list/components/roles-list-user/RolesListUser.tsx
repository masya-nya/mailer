import React, { DragEvent, useContext } from 'react';
import cl from './RolesListUser.module.scss';
import { CSSProperties } from 'react';
import { UserPopulateI } from 'src/entities/user';
import { RoleI, RolesContext } from 'src/entities/roles';

type RolesListUserProps = {
	user: UserPopulateI
	role: RoleI<UserPopulateI>
	className?: string
	style?: CSSProperties
}

export const RolesListUser = ({ user, role, ...props }: RolesListUserProps): React.JSX.Element => {
	const { store: rolesStore } = useContext(RolesContext);

	function dragOverHandler(event: DragEvent<HTMLDivElement>): void {
		// event.target.style.backgroundColor = '#fff';
		event.preventDefault();
	}

	function dragLeaveHandler(_: DragEvent<HTMLDivElement>): void {
		// event.target.style.backgroundColor = '#fff';
	}

	function dragStartHandler(_: DragEvent<HTMLDivElement>, user: UserPopulateI, role: RoleI<UserPopulateI>): void {
		rolesStore.currentDragUser = user;
		rolesStore.currentDragRole = role;
	}

	function dragEndHandler(_: DragEvent<HTMLDivElement>): void {
		// event.target.style.backgroundColor = '#fff';
	}

	function dropHandler(event: DragEvent<HTMLDivElement>, user: UserPopulateI, role: RoleI<UserPopulateI>): void {
		event.preventDefault();
		if (rolesStore.currentDragUser && rolesStore.currentDragRole && rolesStore.roles) {
			const dropUserIndex = rolesStore.currentDragRole.users.indexOf(rolesStore.currentDragUser);
			rolesStore.currentDragRole.users.splice(dropUserIndex, 1);
			const targetUserIndex = role.users.indexOf(user);
			role.users.splice(targetUserIndex + 1, 0,  rolesStore.currentDragUser);
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

	return (
		<div
			{...props}
			draggable
			onDragStart={(e) => dragStartHandler(e, user, role)}
			onDragOver={dragOverHandler}
			onDragLeave={dragLeaveHandler}
			onDragEnd={dragEndHandler}
			onDrop={(e) => dropHandler(e, user, role)}
			className={cl['roles-list-user']}
		>
			{user.name}({user.email})
		</div>
	);
};