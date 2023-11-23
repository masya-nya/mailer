import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDTO {
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsEmail({}, { message: 'Должен быть email' })
	readonly email: string;
	
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@Length(6, 20, { message: 'Должен быть не меньше 6 и не больше 20 символов' })
	readonly password: string;
}