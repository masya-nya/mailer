import { CSSProperties, FC } from 'react';
import cl from './SettingsPage.module.scss';
import { RolesList } from 'src/widgets/roles/roles-list';

interface SettingsPageProps {
	className?: string
	style?: CSSProperties
}

const SettingsPage:FC<SettingsPageProps> = () => {
	return (
		<div className={cl['settings-page']}>
			<RolesList />
		</div>
	);
};

export default SettingsPage;