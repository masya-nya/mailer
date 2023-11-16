import { createContext } from 'react';

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export enum Themes {
	LIGHT = 'light',
	DARK = 'dark',
}

export interface ThemeContextProps {
	theme?: Themes;
	setTheme?: (theme: Themes) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
