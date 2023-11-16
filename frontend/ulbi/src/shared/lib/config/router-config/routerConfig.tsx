import { AboutPageAsync } from 'pages/about-page';
import { MainPageAsync } from 'pages/main-page';
import { NotFoundPage } from 'pages/not-found-page';
import { RouteProps } from 'react-router-dom';


export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	NOT_FOUND = 'not_found',
}

export const RoutePaths: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.ABOUT]: '/about',
	[AppRoutes.NOT_FOUND]: '*'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePaths[AppRoutes.MAIN],
		element: <MainPageAsync />
	},
	[AppRoutes.ABOUT]: {
		path: RoutePaths[AppRoutes.ABOUT],
		element: <AboutPageAsync />
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePaths[AppRoutes.NOT_FOUND],
		element: <NotFoundPage />
	}
};