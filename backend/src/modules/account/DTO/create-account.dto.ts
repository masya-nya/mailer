import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAccountDTO {
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsEmail({}, { message: 'Должен быть email' })
	readonly owner: string;

	@Transform(({ value }) => new Types.ObjectId(value))
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	readonly ownerId: Types.ObjectId;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsString({ message: 'Имя должно быть строкой' })
	@Length(3, 20, { message: 'Название может быть не меньше 3 и не больше 20 символов' })
	readonly name: string;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsString({ message: 'Имя должно быть строкой' })
	@Length(3, 20, { message: 'Название может быть не меньше 3 и не больше 20 символов' })
	readonly login: string;
}