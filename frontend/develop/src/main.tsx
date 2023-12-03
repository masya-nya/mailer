import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './app/providers/theme-provider';
import { AuthContext, contextValue } from './entities/auth/index.ts';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<AuthContext.Provider value={contextValue}>
					<App />
				</AuthContext.Provider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
