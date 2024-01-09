import { CSSProperties, FC, useContext } from 'react';
import cl from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/sidebar/Sidebar';
import { Topbar } from './components/topbar/Topbar';
import { useAccountUser } from 'src/entities/account-user';
import { Loader } from 'src/shared/UI';
import { AuthContext } from 'src/entities/auth';
import { AccountContext } from 'src/entities/account';
import { observer } from 'mobx-react-lite';

interface LayoutProps {
	className?: string;
	style?: CSSProperties;
}

export const Layout: FC<LayoutProps> = observer(() => {
	const { store: authStore } = useContext(AuthContext);
	const { store: accountStore } = useContext(AccountContext);
	console.log({ userId: authStore.user!._id, accountId: accountStore.accountId });
	const { data, isLoading, isValidating } = useAccountUser(authStore.user!._id, accountStore.accountId);
	console.log('ACCOUNT-USER', data);
	if(isLoading || isValidating) {
		return <Loader />;
	}
	return (
		<div className={cl['layout']}>
			<Sidebar />
			<main className={cl['layout__main']}>
				<Topbar  />
				<main className={cl['layout__section']}>
					<Outlet />
				</main>
			</main>
		</div>
	);
});
