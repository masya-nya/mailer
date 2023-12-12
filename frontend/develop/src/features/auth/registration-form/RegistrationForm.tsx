import { CSSProperties, FC, useContext } from 'react';
import cl from './RegistrationForm.module.scss';
import Input from 'antd/es/input';
import cn from 'classnames';
import Button from 'antd/es/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';
import { useTextInput } from 'src/shared/lib/hooks';
import ROUTER_ROTES from 'src/app/router/config';
const { LAYOUT: { BASE }, LOGIN} = ROUTER_ROTES;

interface RegistrationFormProps {
	className?: string;
	style?: CSSProperties;
}

export const RegistrationForm: FC<RegistrationFormProps> = () => {
	const [name, setNameHandler] = useTextInput('');
	const [email, setEmailHandler] = useTextInput('');
	const [password, setPasswordHandler] = useTextInput('');
	const navigate = useNavigate();
	const { store: AuthStore } = useContext(AuthContext);

	const registration = async (e: React.BaseSyntheticEvent):Promise<void> => {
		e.preventDefault();
		const status = await AuthStore.registration({ name, email, password });
		status && navigate(BASE);
	};

	return (
		<form onSubmit={registration} className={cl['registration-form']}>
			<div className={cl['registration-form__inputs']}>
				<Input
					className={cn(
						cl['registration-form__name'],
						cl['registration-form__input']
					)}
					placeholder="Имя"
					value={name}
					onChange={setNameHandler}
					size="large"
				/>
				<Input
					className={cn(
						cl['registration-form__email'],
						cl['registration-form__input']
					)}
					placeholder="Email"
					value={email}
					onChange={setEmailHandler}
					size="large"
				/>
				<Input
					className={cn(
						cl['registration-form__password'],
						cl['registration-form__input']
					)}
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={setPasswordHandler}
					size="large"
				/>
			</div>
			<div className={cl['registration-form__btns']}>
				<span
					onClick={() => navigate(LOGIN)}
					className={cl['registration-form__registration-link']}
				>
					Войти
				</span>
				<Button
					className={cl['registration-form__submit']}
					type="primary"
					size="large"
					shape="round"
					htmlType="submit"
				>
					Зарегистрироваться
				</Button>
			</div>
		</form>
	);
};
