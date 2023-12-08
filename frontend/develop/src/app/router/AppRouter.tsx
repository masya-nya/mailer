import { CSSProperties, FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/LoginPage';
import { Layout } from '../../pages/layout/Layout';
import { HomePage } from '../../pages/home-page/HomePage';
import { AboutPage } from '../../pages/about-page/AboutPage';
import { observer } from 'mobx-react-lite';
import AuthGuard from './routes/AuthGuard';

interface AppRouterProps {
	className?: string
	style?: CSSProperties
}

export const AppRouter:FC<AppRouterProps> = observer(() => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<HomePage />} />
				<Route path='/about-page' element={<AboutPage />} />
			</Route>
			<Route path='/login' element={<AuthGuard><LoginPage /></AuthGuard>} />
		</Routes>
	);
});