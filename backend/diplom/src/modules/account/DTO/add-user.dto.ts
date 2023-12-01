import { IsMongoId, IsEmail, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class AddUserDTO {
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsMongoId({ message: 'Неверный id' })
	readonly accountId: Types.ObjectId;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsEmail({}, { message: 'Должен быть email' })
	readonly userEmail: string;
}