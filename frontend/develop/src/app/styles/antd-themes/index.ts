import { Themes } from 'src/app/providers/theme-provider';

export const antdThemes = {
	[Themes.LIGHT]: {
		components: {
			Button: {
				colorPrimary: '#4254ff',
				algorithm: true,
			},
			Input: {
				colorPrimary: '#1677ff',
				colorBgBase: '#fff',
				algorithm: true,
			}
		},
	},
	[Themes.DARK]: {
		components: {
			Button: {
				colorPrimary: '#444db0',
				algorithm: true,
			},
			Input: {
				colorPrimary: '#25292b',
				colorBgBase: '#25292b',
				colorTextBase: '#EBF1F1',
				colorBorder: '#313538',
				algorithm: true,
			}
		},
	},
};