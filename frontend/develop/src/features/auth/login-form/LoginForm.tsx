import React, { FormEvent, useContext } from 'react';
import cl from './LoginForm.module.scss';
import { Button, Input } from 'antd';
import { useTextInput } from 'src/shared/lib/hooks';
import cn from 'classnames';
import { AuthContext } from 'src/entities/auth';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Test } from '../test/Test';

export const LoginForm: React.FC = observer(() => {
	const [email, setEmailHandler] = useTextInput('');
	const [password, setPasswordHandler] = useTextInput('');
	const navigate = useNavigate();
	const { store } = useContext(AuthContext);


	const login = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		const status = await store.login({ email, password });
		status && navigate('/');
	};

	const registration = async ():Promise<void> => {
		const status = await store.registration({ email, password });
		status && navigate('/');
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
					type='password'
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
				<Test />
			</div>
		</form>
	);
});
