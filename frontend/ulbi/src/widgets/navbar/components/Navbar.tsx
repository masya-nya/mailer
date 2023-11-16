import cl from './Navbar.module.scss';
import { classNames } from 'shared/lib/helpers';
import { CSSProperties, FC } from 'react';
import { RouterLink, ThemeSwitcher } from 'shared/UI';
import { RoutePaths } from 'shared/lib/config';

interface NavbarProps {
	className?: string
	style?: CSSProperties
}

export const Navbar:FC<NavbarProps> = ({ className }) => {
	return (
		<div className={classNames(cl['navbar'], {}, [className])}>
			<div className={cl['navbar__logo']}>
				<ThemeSwitcher />
			</div>
			<div className={cl['navbar__links']}>
				<RouterLink to={RoutePaths.main}>Главная</RouterLink>
				<RouterLink to={RoutePaths.about}>О нас</RouterLink>
			</div>
		</div>
	);
};
