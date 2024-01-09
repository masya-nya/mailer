import { FC, PropsWithChildren, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/entities/auth';
import { ROUTER_ROTES } from '../config';
const { ACCOUNT_CREATE } = ROUTER_ROTES;

const HasAccount: FC<PropsWithChildren> = ({ children }) => {
	console.log('HasAccount');
	const { store: authStore } = useContext(AuthContext);
	const accounts = authStore.accounts;

	if (!authStore.user || !Boolean(accounts.length)) {
		console.log(`NAVIGATE TO ${ACCOUNT_CREATE}`);
		return <Navigate to={ACCOUNT_CREATE} />;
	}

	return <>{ children }</>;
};

export default observer(HasAccount);
