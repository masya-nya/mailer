import './styles/index.scss';
import cl from './App.module.scss';
import { useTheme } from './providers/theme-provider';
import { classNames } from 'shared/lib/helpers';
import { Navbar } from 'widgets/navbar';
import { AppRouter } from './router';
import { Sidebar } from 'widgets/sidebar';

const App = () => {
	const { theme } = useTheme();
	return (
		<div className={classNames('app', {}, [theme])}>
			<Navbar />
			<div className={cl['content']}>
				<Sidebar />
				<div className={cl['page-wrapper']}>
					<AppRouter />
				</div>
			</div>
		</div>
	);
};

export default App;
