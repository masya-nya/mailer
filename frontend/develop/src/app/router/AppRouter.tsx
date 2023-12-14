import { CSSProperties, FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/LoginPage';
import { Layout } from '../../pages/layout/Layout';
import { HomePage } from '../../pages/home-page/HomePage';
import { SettingsPage } from '../../pages/about-page/AboutPage';
import { observer } from 'mobx-react-lite';
import AuthGuard from './guards/AuthGuard';
import { RegistrationPage } from 'src/pages/registration-page/RegistrationPage';
import ROUTER_ROTES from 'src/app/router/config';
import AccountGuard from './guards/AccountGuard';
import { AccountPage } from 'src/pages/account-page/AccountPage';
const { LAYOUT: { BASE, SETTINGS, ACCOUNT }, LOGIN, REGISTRATION } = ROUTER_ROTES;

interface AppRouterProps {
	className?: string
	style?: CSSProperties
}

export const AppRouter:FC<AppRouterProps> = observer(() => {
	return (
		<Routes>
			<Route path={BASE} element={<Layout />}>
				<Route index element={<AccountGuard><HomePage /></AccountGuard>} />
				<Route path={SETTINGS} element={<AccountGuard><SettingsPage /></AccountGuard>} />
				<Route path={ACCOUNT} element={<AccountPage />} />
			</Route>
			<Route path={LOGIN} element={<AuthGuard><LoginPage /></AuthGuard>} />
			<Route path={REGISTRATION} element={<AuthGuard><RegistrationPage /></AuthGuard>} />
			<Route path='*' element={<span>Ошибочка</span>} />
		</Routes>
	);
});