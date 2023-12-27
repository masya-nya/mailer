import React, { DragEvent } from 'react';
import cl from './RolesListUser.module.scss';
import { CSSProperties } from 'react';
import { UserPopulateI } from 'src/entities/user';

type RolesListUserProps = {
	user: UserPopulateI
	className?: string
	style?: CSSProperties
}

export const RolesListUser = ({ user, ...props }: RolesListUserProps): React.JSX.Element => {

	function dragOverHandler(event: DragEvent<HTMLDivElement>): void {
		event.preventDefault();
	}

	function dragLeaveHandler(event: DragEvent<HTMLDivElement>): void {
	}

	function dragStartHandler(event: DragEvent<HTMLDivElement>, user: UserPopulateI): void {
		console.log('dragStart', user);
	}

	function dragEndHandler(event: DragEvent<HTMLDivElement>): void {
	}

	function dropHandler(event: DragEvent<HTMLDivElement>, user: UserPopulateI): void {
		event.preventDefault();
		console.log('drop', user);
	}

	return (
		<div
			{...props}
			draggable
			onDragStart={(e) => dragStartHandler(e, user)}
			onDragOver={dragOverHandler}
			onDragLeave={dragLeaveHandler}
			onDragEnd={dragEndHandler}
			onDrop={(e) => dropHandler(e, user)}
			className={cl['roles-list-user']}
		>
			{user.name}({user.email})
		</div>
	);
};