import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class GetMailsCountDTO {
	@IsNotEmpty({ message: 'Need accountId' })
	@Transform(({ value }) => new Types.ObjectId(value))
    readonly accountId: Types.ObjectId;

	@IsNotEmpty({ message: 'Need email' })
	@IsString({ message: 'Email should be a string' })
	@IsEmail({}, { message: 'Invalid email' })
	readonly email: string;
}
