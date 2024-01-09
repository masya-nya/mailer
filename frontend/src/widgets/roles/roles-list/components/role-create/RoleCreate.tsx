import { CSSProperties, FC } from 'react';
import cl from './RoleCreate.module.scss';

interface RoleCreateProps {
	clickHandler: () => void;
	className?: string;
	style?: CSSProperties;
}

export const RoleCreate: FC<RoleCreateProps> = ({ clickHandler, ...props }) => {
	return (
		<div {...props} onClick={clickHandler} className={cl['role-create']}>
			Добавить роль +
		</div>
	);
};
