const ENDPOINTS = {
	PING: 'ping',
	AUTH: {
		BASE: 'auth',
		REGISTRATION: 'registration',
		LOGIN: 'login',
		LOGOUT: 'logout',
		REFRESH: 'refresh',
	},
	ACCOUNT: {
		BASE: 'account',
		ADD_USER: 'add-user',
		QUERIES: {
			ACCOUNT_ID: 'accountId',
		},
	},
	USER: {
		BASE: 'user',
		ADD_ACCOUNT: 'add-account',
		QUERIES: {
			EMAIL: 'email',
		},
	},
	ACCOUNT_USER: {
		BASE: 'account-user',
	},
	ROLE: {
		BASE: 'role',
	},
	MAIL_AUTH: {
		BASE: 'mail-auth',
		GOOGLE: {
			AUTH: 'google-auth',
			REDIRECT: 'google-redirect',
		},
		YANDEX: {
			AUTH: 'yandex-auth',
			REDIRECT: 'yandex-redirect',
		},
		MAILRU: {
			AUTH: 'mailru-auth',
			REDIRECT: 'mailru-redirect',
		},
	},
	MAILS: {
		BASE: 'mails',
		COUNT_IN_BOXES: 'count-in-boxes'
	}
};

export default ENDPOINTS;
