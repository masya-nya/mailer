import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from 'shared/lib/config';

export const AppRouter = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				{
					Object.values(routeConfig).map(({ path, element }) => (
						<Route path={path} element={element} key={path} />
					))
				}
			</Routes>
		</Suspense>
	);
};
