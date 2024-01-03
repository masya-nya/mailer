import { FC, useContext, useEffect, useMemo } from 'react';
import './styles/index.scss';
import cn from 'classnames';
import { useTheme } from './providers/theme-provider';
import { ConfigProvider, FloatButton } from 'antd';
import { antdThemes } from './styles/antd-themes';
import { ThemeSvg } from 'src/shared/svg';
import { AuthContext } from 'src/entities/auth';
import { observer } from 'mobx-react-lite';
import { GlobalShadowLoader, GlobalShadowLoaderProvider, ModalWrapper } from 'src/shared/UI';
import Routes from './router/AppRouter';
import { ModalProvider } from 'src/entities/modal';
import { NotificationProvider } from 'src/entities/notification';
import { NotificationsWrapper } from 'src/widgets/notification';
import { SWGColors } from 'src/shared/lib';
import { EmailProvider } from 'src/entities/email';

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
			<ModalProvider>
				<NotificationProvider>
					<GlobalShadowLoaderProvider>
						<EmailProvider>
							<div className={cn('app', theme)}>
								<Routes />
								<FloatButton icon={<ThemeSvg height='18px' width='18px' color={SWGColors.black} />} onClick={toggleTheme} />
								<GlobalShadowLoader />
								<ModalWrapper />
								<NotificationsWrapper />
							</div>
						</EmailProvider>
					</GlobalShadowLoaderProvider>
				</NotificationProvider>
			</ModalProvider>
		</ConfigProvider>
	);
};

export default observer(App);
