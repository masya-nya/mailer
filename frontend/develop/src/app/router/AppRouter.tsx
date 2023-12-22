import React, { FC } from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from 'src/pages/layout';
import { RegistrationPage } from 'src/pages/registration-page';
import { LoginPage } from 'src/pages/login-page';
import { HomePage } from 'src/pages/home-page/HomePage';
const LazySettingsPage = React.lazy(() => import('src/pages/settings-page/SettingsPage'));
import { AccountPage } from 'src/pages/account-page/AccountPage';
import { AccountSelectionPage } from 'src/pages/account-selection-page';
import { ROUTER_ROTES } from 'src/app/router/config';
import NotAuthorized from './guards/NotAuthorized';
import HasAccount from './guards/HasAccount';
import { NoAccountSelected } from './guards/NoAcountSelected';
import AlreadyLogged from './guards/AlreadyLogged';
const { LAYOUT: { BASE, SETTINGS }, ACCOUNT_CREATE, ACCOUNT_SELECTION, LOGIN, REGISTRATION } = ROUTER_ROTES;

const Routes: FC = () => {

	const LayoutRoutes: RouteObject[] = [
		{
			path: BASE,
			element:
				<NotAuthorized>
					<HasAccount>
						<NoAccountSelected>
							<Layout />
						</NoAccountSelected>
					</HasAccount>
				</NotAuthorized>,
			children: [
				{
					index: true,
					element: <HomePage />
				},
				{
					path: SETTINGS,
					element:
						<React.Suspense fallback='loading...' >
							<LazySettingsPage />
						</React.Suspense>
				}
			]
		},
		{
			path: ACCOUNT_CREATE,
			element:
				<NotAuthorized>
					<AccountPage />
				</NotAuthorized>
		},
		{
			path: ACCOUNT_SELECTION,
			element:
				<NotAuthorized>
					<AccountSelectionPage />
				</NotAuthorized>
		}
	];

	const AuthRoutes: RouteObject[] = [
		{
			path: REGISTRATION,
			element:
				<AlreadyLogged>
					<RegistrationPage />
				</AlreadyLogged>
		},
		{
			path: LOGIN,
			element:
				<AlreadyLogged>
					<LoginPage />
				</AlreadyLogged>
		}
	];

	const ErrorRoutes: RouteObject[] = [
		{
			path: '*',
			element: <span>Ошибочка</span>
		}
	];

	const router = createBrowserRouter([
		...LayoutRoutes,
		...AuthRoutes,
		...ErrorRoutes
	]);

	return <RouterProvider router={router} />;
};

export default Routes;