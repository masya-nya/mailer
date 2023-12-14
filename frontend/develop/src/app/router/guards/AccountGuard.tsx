import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';
import ROUTER_ROTES from '../config';
const { LAYOUT: { ACCOUNT } } = ROUTER_ROTES;

type AccountGuardT = {
	children: React.ReactNode
}

const AccountGuard: FC<AccountGuardT> = ({ children }) => {
	const { store } = useContext(AuthContext);

	if (!store.user || !Boolean(store.user?.accounts.length)) {
		console.log('REDIRECT to ACCOUNT');
		return <Navigate to={ACCOUNT} />;
	}

	return children;
};

export default observer(AccountGuard);
