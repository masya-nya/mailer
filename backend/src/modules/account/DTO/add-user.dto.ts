import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class AddUserDTO {
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@Transform(({ value }) => new Types.ObjectId(value))
	readonly accountId: Types.ObjectId;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsEmail({}, { message: 'Должен быть email' })
	readonly userEmail: string;
}