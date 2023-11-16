import cl from './ThemeSwitcher.module.scss';
import { CSSProperties, FC } from 'react';
import { useTheme } from 'app/providers/theme-provider';
import { classNames } from 'shared/lib/helpers';

interface ThemeSwitcherProps {
	className?: string
	style?: CSSProperties
}

export const ThemeSwitcher:FC<ThemeSwitcherProps> = ({ className }) => {
	const { toggleTheme } = useTheme();

	return (
		<button className={classNames(cl['theme-switcher'], {}, [className])} onClick={toggleTheme}>
			TOGGLE THEME
		</button>
	);
};