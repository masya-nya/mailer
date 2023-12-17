import { CSSProperties, FC } from 'react';
import cl from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Sidebar } from './components/sidebar/Sidebar';
import { Topbar } from './components/topbar/Topbar';
import { useAccountUser } from 'src/entities/account-user';
import { Loader } from 'src/shared/UI';

interface LayoutProps {
	className?: string;
	style?: CSSProperties;
}

export const Layout: FC<LayoutProps> = observer(() => {
	const { data, isLoading, isValidating } = useAccountUser('anonim010899@gmail.com', '657ecd9ef4040a75eaa4473c');
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
