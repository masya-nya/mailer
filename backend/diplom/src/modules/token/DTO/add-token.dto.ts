import { Types } from 'mongoose';

export class AddTokenDTO {
	readonly userId: Types.ObjectId;
	
	readonly refreshToken: string;
}