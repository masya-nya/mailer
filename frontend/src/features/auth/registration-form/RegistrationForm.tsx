import { CSSProperties, FC, useContext, useCallback, useState, useMemo } from 'react';
import cl from './RegistrationForm.module.scss';
import Input from 'antd/es/input';
import cn from 'classnames';
import Button from 'antd/es/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';
import { useTextInput } from 'src/shared/lib/hooks';
import { ROUTER_ROTES } from 'src/app/router/config';
import { EmailRegValidation } from 'src/shared/lib';
const { LAYOUT: { BASE }, LOGIN } = ROUTER_ROTES;

interface RegistrationFormProps {
	className?: string;
	style?: CSSProperties;
}

export const RegistrationForm: FC<RegistrationFormProps> = () => {
	const [name, setNameHandler] = useTextInput('');
	const [isValidName, setValidName] = useState(true);
	const [email, setEmailHandler] = useTextInput('');
	const [isValidEmail, setValidEmail] = useState(true);
	const [password, setPasswordHandler] = useTextInput('');
	const [isValidPassword, setValidPassword] = useState(true);
	const navigate = useNavigate();
	const { store: AuthStore } = useContext(AuthContext);

	const registration = async (e: React.BaseSyntheticEvent): Promise<void> => {
		e.preventDefault();
		const status = await AuthStore.registration({ name, email, password });
		status && navigate(BASE);
	};

	const validateName = useCallback(():void => {
		const length = name.length;
		if (+length < 2) {
			setValidName(false);
		} else {
			setValidName(true);
		}
	}, [name]);

	const validateEmail = useCallback(():void => {
		const isValid = EmailRegValidation.test(email);
		setValidEmail(isValid);
	}, [email]);

	const validatePassword = useCallback(():void => {
		const length = password.length;
		if (+length < 6) {
			setValidPassword(false);
		} else {
			setValidPassword(true);
		}
	}, [password]);

	const buttonValidate = useMemo(() => {
		return !(isValidEmail && isValidPassword && isValidName);
	}, [isValidEmail, isValidPassword, isValidName]);

	return (
		<div className={cl['registration']}>
			<div className={cl['registration__title']}>Регистрация</div>
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
						onBlur={validateName}
						status={!isValidName ? 'error' : ''}
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
						onBlur={validateEmail}
						status={!isValidEmail ? 'error' : ''}
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
						onBlur={validatePassword}
						status={!isValidPassword ? 'error' : ''}
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
						disabled={buttonValidate}
					>
						Зарегистрироваться
					</Button>
				</div>
			</form>
		</div>
	);
};
