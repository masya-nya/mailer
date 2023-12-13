import { IsNotEmpty, IsString } from 'class-validator';
import { LoginDTO } from 'src/modules/auth/DTO/login.dto';

export class CreateUserDTO extends LoginDTO {

	@IsNotEmpty({ message: 'Не должно быть пустым' })
	@IsString()
	readonly name: string;
}