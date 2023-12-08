import { CSSProperties, FC, useContext } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { AuthContext } from 'src/entities/auth';
import { Loader } from 'src/shared/UI';
import { Test } from 'src/features/auth/test/Test';

interface LayoutProps {
	className?: string;
	style?: CSSProperties;
}

export const Layout: FC<LayoutProps> = observer(() => {
	const { store } = useContext(AuthContext);
	console.log(store.isAuth);
	
	const logoutHandler = ():void => {
		store.logout();
	};

	if (store.isAuthInProgress) {
		return <Loader />;
	}

	if (!store.isAuth) {
		return <Navigate to="/login" />;
	}

	return (
		<div>
			<div>
				<Link to={'/'}>Home</Link>
				<Link to={'/about-page'}>About Page</Link>
				<Button type="primary" onClick={logoutHandler}>Выход</Button>
				<Test />
			</div>

			<main>
				<Outlet />
			</main>
		</div>
	);
});
