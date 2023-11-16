import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDTO {
	@ApiProperty({ example: 'maxim.zudin@gmail.com', description: 'Почтовый адрес' })
	@IsString({ message: 'Должно быть строкой' })
	@IsEmail({}, { message: 'Некорректный email' })
	readonly email: string;

	@ApiProperty({ example: 'qwerty123', description: 'Пароль пользователя' })
	@IsString({ message: 'Должно быть строкой' })
	@Length(4, 16, { message: 'Пароль должен быть не меньше 4 и не больше 16 символов' })
	readonly password: string;
}
