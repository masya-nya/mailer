import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';

type AuthGuardT = {
	children: React.ReactNode
}

const AuthGuard: FC<AuthGuardT> = ({ children }) => {
	const { store } = useContext(AuthContext);
	console.log(store.isAuth);

	if (store.isAuthInProgress) {
		return <div>Checking auth...</div>;
	}

	if (store.isAuth) {
		return children;
	}

	return <Navigate to="/login" />;
};

export default observer(AuthGuard);
