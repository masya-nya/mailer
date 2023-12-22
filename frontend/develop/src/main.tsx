import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { ThemeProvider } from './app/providers/theme-provider';
import { AuthProvider } from './entities/auth';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeProvider>
		<AuthProvider>
			<App />
		</AuthProvider>
	</ThemeProvider>
);
