const ENDPOINTS = {
	PING: 'ping',
	AUTH: {
		BASE: 'auth',
		REGISTRATION: 'registration',
		LOGIN: 'login',
		LOGOUT: 'logout',
		REFRESH: 'refresh'
	},
	ACCOUNT: {
		BASE: 'account',
		ADD_USER: 'add-user',
		QUERIES: {
			ACCOUNT_ID: 'accountId'
		}
	},
	USER: {
		BASE: 'user',
		ADD_ACCOUNT: 'add-account',
		QUERIES: {
			EMAIL: 'email'
		}
	}
};

export default ENDPOINTS;