import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoleDTO {
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsString()
	@Length(2, 20, { message: 'Должен быть не меньше 2 и не больше 20 символов' })
	readonly name: string;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsMongoId({ message: 'Неправильное id аккаунта' })
	readonly accountId: Types.ObjectId;

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsString({ each: true })
	readonly rights: string;
}