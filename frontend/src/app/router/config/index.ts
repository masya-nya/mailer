export const ROUTER_ROTES = {
	REGISTRATION: '/registration',
	LOGIN: '/login',
	ACCOUNT_CREATE: 'account',
	ACCOUNT_SELECTION: 'account-selection',
	LAYOUT: {
		BASE: '/',
		SETTINGS: 'settings',
		EMAIL: {
			BASE: 'email',
			ADD: 'add',
			PARAMS: {
				EMAIL: 'email'
			}
		}
	}
};

export const ROUTES_TITLE:Record<string, string> = {
	'/': 'Домашняя страница',
	'/settings': 'Настройки'
};