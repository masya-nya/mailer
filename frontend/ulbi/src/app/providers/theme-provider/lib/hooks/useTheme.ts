import { useContext } from 'react';
import { Themes, ThemeContext, LOCAL_STORAGE_THEME_KEY } from '../../model/ThemeContext';

interface UseThemeResult {
	theme: Themes;
	toggleTheme: () => void;
}

export function useTheme():UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
		const newTheme = theme == Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
		setTheme(newTheme);
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};
	return { theme, toggleTheme };
}