import { baseMailBoxesValue, baseMailBoxesTitle } from 'src/entities/mail-boxes';

export type FilterQueryT = 'flagged' | 'seen' | 'all';

export type MailsFilterT = {
	path?: baseMailBoxesValue,
	pathName?: baseMailBoxesTitle,
	page?: number,
	limit?: number
	filterQuery?: FilterQueryT
	filterQueryValue?: boolean
	markId?: string
}
export type mailFolderT = {
	path: baseMailBoxesValue,
	pathName: baseMailBoxesTitle,
}