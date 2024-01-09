import { CSSProperties, FC } from 'react';
import cl from './AddNewEmailButton.module.scss';
import { useNavigate } from 'react-router-dom';

interface AddNewEmailButtonProps {
	className?: string
	style?: CSSProperties
}

export const AddNewEmailButton:FC<AddNewEmailButtonProps> = () => {
	const navigation = useNavigate();
	return (
		<div onClick={() => navigation('email/add')} className={cl['add-new-email-button']}>
			Добавить почтовый ящик
		</div>
	);
};