import { AccountPopulateI } from 'src/entities/account/model/schemas/account.schema';

export interface AccountUserI {
	userId: string
	email: string
	accounts: AccountPopulateI[]
	isActivate: boolean
	accountName: string
	accountLogin: string
	accountId: string
	roleName: string
	roleRights: string[]
}