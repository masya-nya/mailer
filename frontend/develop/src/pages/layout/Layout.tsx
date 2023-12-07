import { CSSProperties, FC, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { AuthContext } from 'src/entities/auth';

interface LayoutProps {
	className?: string;
	style?: CSSProperties;
}

export const Layout: FC<LayoutProps> = observer(() => {
	console.log('Layout');
	const { store } = useContext(AuthContext);

	const logoutHandler = ():void => {
		store.logout();
	};

	return (
		<div>
			<div>
				<Link to={'/'}>Home</Link>
				<Link to={'/about-page'}>About Page</Link>
				<Button type="primary" onClick={logoutHandler}>Выход</Button>
			</div>

			<main>
				<Outlet />
			</main>
		</div>
	);
});
