import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';
import { ROUTER_ROTES } from '../config';
const { ACCOUNT_CREATE } = ROUTER_ROTES;

type HasAccountT = {
	children: React.ReactNode
}

const HasAccount: FC<HasAccountT> = ({ children }) => {
	console.log('HasAccount');
	const { store: authStore } = useContext(AuthContext);
	const accounts = authStore.accounts;

	if (!authStore.user || !Boolean(accounts.length)) {
		console.log(`NAVIGATE TO ${ACCOUNT_CREATE}`);
		return <Navigate to={ACCOUNT_CREATE} />;
	}

	return children;
};

export default observer(HasAccount);
