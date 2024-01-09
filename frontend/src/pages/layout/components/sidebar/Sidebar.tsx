import { CSSProperties, FC, useContext } from 'react';
import cl from './Sidebar.module.scss';
import { AuthContext } from 'src/entities/auth';
import { Button } from 'antd';
import { LogoMain } from 'src/shared/UI';
import { GroupedNavlinks } from 'src/shared/UI/navlinks';
import { SidebarNavigationGroups } from './config';
import { EmailsNavigation } from 'src/features/emails';

interface SidebarProps {
	className?: string;
	style?: CSSProperties;
}

export const Sidebar: FC<SidebarProps> = () => {
	const { store } = useContext(AuthContext);
	const logoutHandler = (): void => {
		store.logout();
	};

	return (
		<div className={cl['sidebar']}>
			<div className={cl['sidebar__logo']}>
				<LogoMain />
			</div>
			<div className={cl['sidebar__body']}>
				{SidebarNavigationGroups.map(sidebarGroup => (
					<GroupedNavlinks
						title={sidebarGroup.title}
						links={sidebarGroup.links}
						key={sidebarGroup.title}
					/>
				))}
				<EmailsNavigation />
				<Button type="primary" onClick={logoutHandler}>
					Выход
				</Button>
			</div>
		</div>
	);
};
