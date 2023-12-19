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
	console.log('HasAccount');
	const { store: authStore } = useContext(AuthContext);
	const accounts = authStore.accounts;

	console.log('user', authStore.user);
	console.log('accounts', accounts);

	if (!authStore.user || !Boolean(accounts.length)) {
		console.log(`NAVIGATE TO ${ACCOUNT}`);
		return <Navigate to={ACCOUNT} />;
	}

	return children;
};

export default observer(HasAccount);
