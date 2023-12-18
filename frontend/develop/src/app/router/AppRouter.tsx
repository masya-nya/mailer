import { CSSProperties, FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LoginPage } from '../../pages/login-page';
import { Layout } from '../../pages/layout';
import { HomePage } from '../../pages/home-page/HomePage';
import { SettingsPage } from '../../pages/about-page/AboutPage';
import { RegistrationPage } from 'src/pages/registration-page';
import { AccountPage } from 'src/pages/account-page/AccountPage';
import AlreadyLogged from './guards/AlreadyLogged';
import HasAccount from './guards/HasAccount';
import { ROUTER_ROTES } from 'src/app/router/config';
import NotAuthorized from './guards/NotAuthorized';
import { AccountSelectionPage } from 'src/pages/account-selection-page';
const { LAYOUT: { BASE, SETTINGS, ACCOUNT_SELECTION }, LOGIN, REGISTRATION, ACCOUNT } = ROUTER_ROTES;

interface AppRouterProps {
	className?: string
	style?: CSSProperties
}

export const AppRouter: FC<AppRouterProps> = observer(() => {
	return (
		<Routes>
			<Route path={BASE} element={<NotAuthorized><HasAccount><Layout /></HasAccount></NotAuthorized>}>
				<Route index element={<HomePage />} />
				<Route path={ACCOUNT_SELECTION} element={<AccountSelectionPage />} />
				<Route path={SETTINGS} element={<SettingsPage />} />
			</Route>
			<Route path={ACCOUNT} element={<NotAuthorized><AccountPage /></NotAuthorized>} />
			<Route path={LOGIN} element={<AlreadyLogged><LoginPage /></AlreadyLogged>} />
			<Route path={REGISTRATION} element={<AlreadyLogged><RegistrationPage /></AlreadyLogged>} />
			<Route path='*' element={<span>Ошибочка</span>} />
		</Routes>
	);
});