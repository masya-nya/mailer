import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteRoleDTO {
	@Transform(({ value }) => new Types.ObjectId(value))
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	readonly _id: Types.ObjectId;
	
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsString({ message: 'Должно быть строкой' })
	readonly name: string;

	@Transform(({ value }) => new Types.ObjectId(value))
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	readonly accountId: Types.ObjectId;
}