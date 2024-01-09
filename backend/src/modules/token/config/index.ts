export type TokensExpiresT = {
	value: string
	milliseconds: number
}

export const TokensExpires: Record<'ACCESS' | 'REFRESH', TokensExpiresT> = {
	ACCESS: {
		value: '30m',
		milliseconds: 30 * 60 * 60 * 1000
	},
	REFRESH: {
		value: '30d',
		milliseconds: 30 * 24 * 60 * 60 * 1000
	},
};