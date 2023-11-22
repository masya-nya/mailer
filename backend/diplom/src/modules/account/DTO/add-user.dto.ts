import { IsMongoId, IsEmail, IsNotEmpty } from 'class-validator';

export class AddUserDTO {
	@IsNotEmpty({ message: 'Need accountId' })
	@IsMongoId({ message: 'Incorrect id' })
	readonly accountId: string;

	@IsNotEmpty({ message: 'Need userEmail' })
	@IsEmail()
	readonly userEmail: string;
}