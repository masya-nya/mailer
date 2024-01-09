import { UserI } from 'src/entities/user/model/schemas/user.schema';

export interface AuthResponseI {
	accessToken: string
	refreshToken: string
	user: UserI
}