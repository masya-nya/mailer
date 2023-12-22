import { CSSProperties, FC } from 'react';
import cl from './SettingsPage.module.scss';

interface SettingsPageProps {
	className?: string
	style?: CSSProperties
}

const SettingsPage:FC<SettingsPageProps> = () => {
	return (
		<div className={cl['settings-page']}>
			AboutPage
		</div>
	);
};

export default SettingsPage;