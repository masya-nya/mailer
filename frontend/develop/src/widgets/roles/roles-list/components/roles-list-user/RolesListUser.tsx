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

	function dragOverLeave(event: DragEvent<HTMLDivElement>): void {
		throw new Error('Function not implemented.');
	}

	function dragOverStart(event: DragEvent<HTMLDivElement>): void {
		throw new Error('Function not implemented.');
	}

	function dragOverEnd(event: DragEvent<HTMLDivElement>): void {
		throw new Error('Function not implemented.');
	}

	function dropHandler(event: DragEvent<HTMLDivElement>): void {
		event.preventDefault();
	}

	return (
		<div
			{...props}
			draggable
			onDragOver={dragOverHandler}
			onDragLeave={dragOverLeave}
			onDragStart={dragOverStart}
			onDragEnd={dragOverEnd}
			onDrop={dropHandler}
			className={cl['roles-list-user']}
		>
			{user.name}({user.email})
		</div>
	);
};