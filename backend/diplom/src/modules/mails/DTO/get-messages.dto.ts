import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Types } from 'mongoose';

export class GetMessagesDTO {

	@Transform(({ value }) => new Types.ObjectId(value))
	accountId: Types.ObjectId;

	@IsEmail({}, { message: 'Должен быть email' })
	email: string;

	mailboxPath: string;
}