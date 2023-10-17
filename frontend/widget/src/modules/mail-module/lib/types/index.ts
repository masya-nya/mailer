export type FetchingEntitiesType = 'folders' | 'marks' | 'MailBoxesCount' | 'mails';

export type FilterQueryT = 'flagged' | 'seen' | 'all'

export type MailsBaseFilterT = {
	path?: string,
	pathName?: string,
	page?: number,
	limit?: number
	filterQuery?: FilterQueryT
	filterQueryValue?: boolean
	markId?: string
}

export type MailsDateFilterT = {
	dateFrom?: string
	dateTo?: string
}
export type MailsDateFilterKeysT = keyof MailsDateFilterT

export type MailsFilterT = MailsBaseFilterT & MailsDateFilterT

export type mailFolderT = {
	path: string,
	pathName: string,
}