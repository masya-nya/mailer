import React, { FormEvent, useContext } from 'react';
import cl from './LoginForm.module.scss';
import { Button, Input } from 'antd';
import { useTextInput } from 'src/shared/lib/hooks';
import cn from 'classnames';
import { AuthContext } from 'src/entities/auth';

export const LoginForm: React.FC = () => {
	const [email, setEmailHandler] = useTextInput('');
	const [password, setPasswordHandler] = useTextInput('');
	const { store } = useContext(AuthContext);


	const login = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		store.login({ email, password });
	};

	const registration = ():void => {
		store.registration({ email, password });
	};

	return (
		<form onSubmit={login} className={cl['login-form']}>
			<div className={cl['login-form__inputs']}>
				<Input
					className={cn(
						cl['login-form__email'],
						cl['login-form__input']
					)}
					placeholder="Email"
					value={email}
					onChange={setEmailHandler}
					size='large'
				/>
				<Input
					className={cn(
						cl['login-form__password'],
						cl['login-form__input']
					)}
					placeholder="Пароль"
					value={password}
					onChange={setPasswordHandler}
					size='large'
				/>
			</div>
			<div className={cl['login-form__btns']}>
				<Button
					className={cl['login-form__submit']}
					type="primary"
					size="large"
					shape="round"
					htmlType="submit"
				>
					Войти
				</Button>
				<Button
					className={cl['login-form__submit']}
					type="primary"
					size="large"
					shape="round"
					onClick={registration}
				>
					Регистрация
				</Button>
			</div>
		</form>
	);
};
