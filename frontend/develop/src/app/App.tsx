import './styles/index.scss';
import cn from 'classnames';
import { AppRouter } from './router/AppRouter';
import { useTheme } from './providers/theme-provider';
import { ConfigProvider, FloatButton } from 'antd';
import { useMemo } from 'react';
import { antdThemes } from './styles/antd-themes';
import { ThemeSvg } from 'src/shared/svg';



function App(): React.JSX.Element {
	const { theme, toggleTheme } = useTheme();

	const antdTheme = useMemo(() => {
		return antdThemes[theme];
	}, [theme]);

	return (
		<ConfigProvider theme={antdTheme}>
			<div className={cn('app', theme)}>
				<AppRouter />
				<FloatButton icon={<ThemeSvg height='18px' width='18px' color='#000' />} onClick={toggleTheme} />
			</div>
		</ConfigProvider>
	);
}

export default App;
