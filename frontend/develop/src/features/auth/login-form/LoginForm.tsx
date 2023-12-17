import React, { FormEvent, useContext, useMemo } from 'react';
import cl from './LoginForm.module.scss';
import { Button, Input } from 'antd';
import { useTextInput } from 'src/shared/lib/hooks';
import cn from 'classnames';
import { AuthContext } from 'src/entities/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ROUTER_ROTES } from 'src/app/router/config';
const {
	LAYOUT: { BASE },
	REGISTRATION,
} = ROUTER_ROTES;

export const LoginForm: React.FC = observer(() => {
	const { store } = useContext(AuthContext);
	const [email, setEmailHandler] = useTextInput('');
	const [password, setPasswordHandler] = useTextInput('');
	const navigate = useNavigate();
	const location = useLocation();

	const fromPage = useMemo(() => location.state?.from?.pathname || BASE, [location]);

	const login = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		const status = await store.login({ email, password });
		status && navigate(fromPage);
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
					size="large"
				/>
				<Input
					className={cn(
						cl['login-form__password'],
						cl['login-form__input']
					)}
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={setPasswordHandler}
					size="large"
				/>
			</div>
			<div className={cl['login-form__btns']}>
				<span
					onClick={() => navigate(REGISTRATION)}
					className={cl['login-form__registration-link']}
				>
					Регистрация
				</span>
				<Button
					className={cl['login-form__submit']}
					type="primary"
					size="large"
					shape="round"
					htmlType="submit"
				>
					Войти
				</Button>
			</div>
		</form>
	);
});
