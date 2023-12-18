import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';
import { ROUTER_ROTES } from '../config';
const { ACCOUNT } = ROUTER_ROTES;

type HasAccountT = {
	children: React.ReactNode
}

const HasAccount: FC<HasAccountT> = ({ children }) => {
	const { store } = useContext(AuthContext);
	console.log('AccountCheck');

	if (!store.user || !Boolean(store.user?.accounts.length)) {
		console.log('REDIRECT to ACCOUNT');
		return <Navigate to={ACCOUNT} />;
	}

	return children;
};

export default observer(HasAccount);
