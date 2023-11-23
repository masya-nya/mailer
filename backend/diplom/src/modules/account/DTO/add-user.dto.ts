import { IsMongoId, IsEmail, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class AddUserDTORequest {
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsMongoId({ message: 'Неверный id' })
	readonly accountId: string;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsEmail({}, { message: 'Должен быть email' })
	readonly userEmail: string;
}

export class AddUserDTO {
	readonly accountId: Types.ObjectId;

	readonly userEmail: string;
}