export const baseMailBoxesConf = {
	inbox: 'Входящие',
	sent: 'Отправленные',
	deleted: 'Удаленные',
	spam: 'Спам'
} as const;

export type baseMailBoxesValue = keyof typeof baseMailBoxesConf;
export type baseMailBoxesTitle = typeof baseMailBoxesConf[baseMailBoxesValue];
export type baseMailBoxesT = {
	value: baseMailBoxesValue,
	title: baseMailBoxesTitle
}
