import { CSSProperties, FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

interface LayoutProps {
	className?: string;
	style?: CSSProperties;
}

export const Layout: FC<LayoutProps> = () => {
	return (
		<div>
			<div>
				<Link to={'/'}>Home</Link>
				<Link to={'/about-page'}>About Page</Link>
			</div>

			<main>
				<Outlet />
			</main>
		</div>
	);
};
