import { Types } from 'mongoose';

export class AddAccountDTO {
	readonly email: string;

	readonly accountId: Types.ObjectId;
}