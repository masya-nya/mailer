import { Transform, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { MailIdentifyDTO } from './mail-Identify.dto';

export class SendMessasgeDTO {
    @IsNotEmpty({ message: 'Need accountId' })
    @Transform(({ value }) => new Types.ObjectId(value))
    readonly accountId: Types.ObjectId;

    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @IsNotEmpty({ message: 'Need EmailTo' })
    @Transform(({ value }) => JSON.parse(value))
    @IsArray({ message: 'EmailTo should be a array of string' })
    @IsEmail({}, { each: true, message: 'Invalid emailTo' })
    readonly emailTo: string[];

    @IsOptional()
    @IsString({ message: 'Subject should be a string' })
    readonly subject?: string;

    @IsOptional()
    @IsString({ message: 'Html should be a string' })
    readonly html?: string;

    @IsNotEmpty({ message: 'Need mailboxPath' })
    @IsString({ message: 'MailBoxPath should be a string' })
    readonly mailboxPath: string;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    @IsArray({ message: 'references should be a array of string' })
    @ValidateNested({ each: true })
    @Type(() => MailIdentifyDTO)
    readonly references?: MailIdentifyDTO[];
}
