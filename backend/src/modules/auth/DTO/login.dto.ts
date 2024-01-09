import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class LoginDTO {
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsString()
	@IsEmail({}, { message: 'Должен быть email' })
	readonly email: string;
	
	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsString()
	@Length(6, 20, { message: 'Должен быть не меньше 6 и не больше 20 символов' })
	readonly password: string;
}