import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUppercase, Length } from 'class-validator';

export class CreateRoleDTO {
	@ApiProperty({ example: 'ADMIN', description: 'Название создаваемой роли' })
	@Length(1, 15, { message: 'Роль должна быть более 1 и менее 15 символов' })
	@IsString({ message: 'Роль должна быть строкой' })
	@IsUppercase({ message: 'Роль должна быть uppercase' })
	readonly role: string;

	@ApiProperty({ example: 'Роль администратора', description: 'Описание роли' })
	@IsString({ message: 'Описание роли должно быть строкой' })
	readonly description: string;
}
