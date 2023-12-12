import { CSSProperties, FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/LoginPage';
import { Layout } from '../../pages/layout/Layout';
import { HomePage } from '../../pages/home-page/HomePage';
import { SettingsPage } from '../../pages/about-page/AboutPage';
import { observer } from 'mobx-react-lite';
import AuthGuard from './routes/AuthGuard';
import { RegistrationPage } from 'src/pages/registration-page/RegistrationPage';
import ROUTER_ROTES from 'src/app/router/config';
const { LAYOUT: { BASE, SETTINGS }, LOGIN, REGISTRATION } = ROUTER_ROTES;

interface AppRouterProps {
	className?: string
	style?: CSSProperties
}

export const AppRouter:FC<AppRouterProps> = observer(() => {
	return (
		<Routes>
			<Route path={BASE} element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path={SETTINGS} element={<SettingsPage />} />
			</Route>
			<Route path={LOGIN} element={<AuthGuard><LoginPage /></AuthGuard>} />
			<Route path={REGISTRATION} element={<AuthGuard><RegistrationPage /></AuthGuard>} />
			<Route path='*' element={<span>Ошибочка</span>} />
		</Routes>
	);
});