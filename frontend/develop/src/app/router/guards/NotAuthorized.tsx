import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';
import { ROUTER_ROTES } from '../config';
import { Loader } from 'src/shared/UI';
const { LOGIN } = ROUTER_ROTES;

type NotAuthorizedT = {
	children: React.ReactNode
}

const NotAuthorized: FC<NotAuthorizedT> = ({ children }) => {
	console.log('NotAuthorized');
	const { store } = useContext(AuthContext);

	if (store.isAuthInProgress) {
		return <Loader />;
	}
 
	if (!store.isAuth) {
		console.log(`NAVIGATE TO ${LOGIN}`);
		return <Navigate to={LOGIN} />;
	}

	return children;
};

export default observer(NotAuthorized);
