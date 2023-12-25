import { Transform } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Types } from 'mongoose';

export class GetPageOfMailsDTO {
    @IsNotEmpty({ message: 'Need accountId' })
    @Transform(({ value }) => new Types.ObjectId(value))
    readonly accountId: Types.ObjectId;

    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @IsNotEmpty({ message: 'Need limit' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'Limit should be a number' })
    @Min(1)
    readonly limit: number;

    @IsNotEmpty({ message: 'Need page' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'Page should be a number' })
    @Min(1)
    readonly page: number;

    @IsNotEmpty({ message: 'Need mailboxPath' })
    readonly mailboxPath: string;
}
