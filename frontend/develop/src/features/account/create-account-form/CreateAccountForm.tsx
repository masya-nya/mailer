import { CSSProperties, FC, FormEvent, useContext } from 'react';
import cl from './CreateAccountForm.module.scss';
import cn from 'classnames';
import { Button, Input } from 'antd';
import { useTextInput } from 'src/shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from 'src/entities/account/model/context/AccountContext';
import { ROUTER_ROTES } from 'src/app/router/config';
import { observer } from 'mobx-react-lite';
import { AuthContext } from 'src/entities/auth';
const { LAYOUT: { BASE } } = ROUTER_ROTES;

interface CreateAccountFormProps {
	className?: string
	style?: CSSProperties
}

export const CreateAccountForm:FC<CreateAccountFormProps> = observer(() => {
	const { store: accountStore } = useContext(AccountContext);
	const { store: authStore } = useContext(AuthContext);
	const [name, setNameHandler] = useTextInput('');
	const [login, setLoginHandler] = useTextInput('');
	const navigate = useNavigate();

	const create = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		if (authStore.user) {
			const ownerEmail = authStore.user?.email;
			e.preventDefault();
			const status = await accountStore.createAccount({ owner: ownerEmail, name, login });
			const status2 = await authStore.checkAuth();
			status && status2 && navigate(BASE);
		}
	};

	return (
		<form onSubmit={create} className={cl['create-account-form']}>
			<div className={cl['create-account-form__inputs']}>
				<Input
					className={cn(
						cl['create-account-form__email'],
						cl['create-account-form__input']
					)}
					placeholder="Имя"
					value={name}
					onChange={setNameHandler}
					size="large"
				/>
				<Input
					className={cn(
						cl['create-account-form__password'],
						cl['create-account-form__input']
					)}
					placeholder="Логин"
					value={login}
					onChange={setLoginHandler}
					size="large"
				/>
			</div>
			<div className={cl['create-account-form__btns']}>
				{/* <span
					onClick={() => navigate(REGISTRATION)}
					className={cl['create-account-form__registration-link']}
				>
					Регистрация
				</span> */}
				<Button
					className={cl['create-account-form__submit']}
					type="primary"
					size="large"
					shape="round"
					htmlType="submit"
				>
					Создать
				</Button>
			</div>
		</form>
	);
});