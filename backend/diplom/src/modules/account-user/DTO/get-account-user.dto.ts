import { IsNotEmpty, IsString, IsEmail, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class GetAccountUserDTO {
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsString()
	@IsEmail({}, { message: 'Должен быть email' })
	readonly email: string;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsMongoId({ message: 'Неверный id' })
	readonly accountId: Types.ObjectId;
}