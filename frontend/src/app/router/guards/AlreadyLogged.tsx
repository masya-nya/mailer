import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';
import { Loader } from 'src/shared/UI';
import { ROUTER_ROTES } from '../config';
const { LAYOUT: { BASE } } = ROUTER_ROTES;

type AlreadyLoggedT = {
	children: React.ReactNode
}

const AlreadyLogged: FC<AlreadyLoggedT> = ({ children }) => {
	console.log('AlreadyLogged');
	const { store } = useContext(AuthContext);

	if (store.isAuthInProgress) {
		return <Loader />;
	}

	if (store.isAuth) {
		console.log(`NAVIGATE TO ${BASE}`);
		return <Navigate to={BASE} />;
	}

	return children;
};

export default observer(AlreadyLogged);
