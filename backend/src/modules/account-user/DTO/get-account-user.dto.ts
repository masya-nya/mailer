import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GetAccountUserDTO {
	@Transform(({ value }) => new Types.ObjectId(value))
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	readonly userId: Types.ObjectId;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@Transform(({ value }) => new Types.ObjectId(value))
	readonly accountId: Types.ObjectId;
}