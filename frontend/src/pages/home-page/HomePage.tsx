import { CSSProperties, FC } from 'react';
import cl from './HomePage.module.scss';

interface HomePageProps {
	className?: string
	style?: CSSProperties
}

export const HomePage:FC<HomePageProps> = () => {
	return (
		<div className={cl['home-page']}>
			<div className={cl['home-page__info']}>
				<h1 className={cl['home-page__title']}>
					Добро пожаловать в EmailTeam!
				</h1>
				<h2 className={cl['home-page__subtitle']}>
					Основные возможности EmailTeam:
				</h2>
				<div className={cl['home-page__list']}>
					<p className={cl['home-page__p']}>
						<span className={cl['home-page__b']}>Подключение нескольких почт:</span> С легкостью управляйте несколькими почтовыми аккаунтами, используя одно удобное приложение.
					</p>
					<p className={cl['home-page__p']}>
						<span className={cl['home-page__b']}>Разделение на роли:</span> Делегируйте задачи и управляйте доступом с учетом ролей пользователей, чтобы обеспечить эффективную командную работу.
					</p>
					<p className={cl['home-page__p']}>
						<span className={cl['home-page__b']}>Отправка и просмотр сообщений:</span> Отправляйте сообщения, просматривайте и редактируйте их вместе с вашей командой.
					</p>
				</div>
				<p className={cl['home-page__footer']}>
					Спасибо за выбор EmailTeam. Удачной работы!
				</p>
			</div>
		</div>
	);
};