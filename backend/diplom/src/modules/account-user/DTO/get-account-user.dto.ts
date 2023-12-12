import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Types } from 'mongoose';

export class GetAccountUserDTO {
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsString()
	@IsEmail({}, { message: 'Должен быть email' })
	readonly email: string;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@Transform(({ value }) => new Types.ObjectId(value))
	readonly accountId: Types.ObjectId;
}