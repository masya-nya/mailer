import './styles/index.scss';
import cn from 'classnames';
import { AppRouter } from './router/AppRouter';
import { useTheme } from './providers/theme-provider';
import { ConfigProvider, FloatButton } from 'antd';
import { FC, useContext, useEffect, useMemo } from 'react';
import { antdThemes } from './styles/antd-themes';
import { ThemeSvg } from 'src/shared/svg';
import { AuthContext } from 'src/entities/auth';
import { ACCESS_TOKEN_LS_KEY } from 'src/entities/auth/lib/config';
import { observer } from 'mobx-react-lite';



const App:FC = () => {
	console.log('App');
	const { store } = useContext(AuthContext);
	const { theme, toggleTheme } = useTheme();

	const antdTheme = useMemo(() => {
		return antdThemes[theme];
	}, [theme]);

	useEffect(() => {
		console.log('useEffect');
		(async ():Promise<void> => {
			if (localStorage.getItem(ACCESS_TOKEN_LS_KEY)) {
				await store.checkAuth();
			}
			console.log('isAuth', store.isAuth);
		})();
	}, [store]);

	return (
		<ConfigProvider theme={antdTheme}>
			<div className={cn('app', theme)}>
				<AppRouter />
				<FloatButton icon={<ThemeSvg height='18px' width='18px' color='#000' />} onClick={toggleTheme} />
			</div>
		</ConfigProvider>
	);
};

export default observer(App);
