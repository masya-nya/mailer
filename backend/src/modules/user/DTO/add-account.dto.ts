import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class AddAccountDTO {
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsEmail({}, { message: 'Должен быть email' })
	readonly email: string;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsMongoId({ message: 'Неверный id' })
	readonly accountId: Types.ObjectId;
}