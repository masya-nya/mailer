import { FC, useContext, useEffect, useMemo } from 'react';
import './styles/index.scss';
import cn from 'classnames';
import { useTheme } from './providers/theme-provider';
import { ConfigProvider, FloatButton } from 'antd';
import { antdThemes } from './styles/antd-themes';
import { ThemeSvg } from 'src/shared/svg';
import { AuthContext } from 'src/entities/auth';
import { observer } from 'mobx-react-lite';
import { GlobalShadowLoader, GlobalShadowLoaderProvider } from 'src/shared/UI';
import Routes from './router/AppRouter';



const App:FC = () => {
	const { store } = useContext(AuthContext);
	const { theme, toggleTheme } = useTheme();

	const antdTheme = useMemo(() => {
		return antdThemes[theme];
	}, [theme]);

	useEffect(() => {
		(async ():Promise<void> => {
			await store.checkAuth();
		})();
	}, [store]);

	return (
		<ConfigProvider theme={antdTheme}>
			<GlobalShadowLoaderProvider>
				<div className={cn('app', theme)}>
					<Routes />
					<FloatButton icon={<ThemeSvg height='18px' width='18px' color='#000' />} onClick={toggleTheme} />
					<GlobalShadowLoader />
				</div>
			</GlobalShadowLoaderProvider>
		</ConfigProvider>
	);
};

export default observer(App);
