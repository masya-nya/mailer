import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';

type NotAuthGuardT = {
	children: React.ReactNode
}

const NotAuthGuard: FC<NotAuthGuardT> = ({ children }) => {
	const { store } = useContext(AuthContext);

	if (store.isAuthInProgress) {
		return <div>Checking auth...</div>;
	}

	if (store.isAuth) {
		return <Navigate to="/" />;
	}

	return children;
};

export default observer(NotAuthGuard);
