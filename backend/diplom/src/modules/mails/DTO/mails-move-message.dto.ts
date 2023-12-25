import { Transform, Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { MailIdentifyDTO } from './mail-Identify.dto';
import { Types } from 'mongoose';

export class MailsMoveMessageDTO {
    @IsNotEmpty({ message: 'Need accountId' })
    @Transform(({ value }) => new Types.ObjectId(value))
    readonly accountId: Types.ObjectId;

    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @IsNotEmpty({ message: 'Need mailboxPath' })
    @IsString({ message: 'MailBoxPath should be a string' })
    readonly mailboxPath: string;

    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'MailBoxDestinationPath should be a string' })
    readonly mailboxDestinationPath: string;

    @IsNotEmpty({ message: 'Need array of msgIds objects' })
    @IsArray({ message: 'MsgIds should be an array of msgIds objects' })
    @ValidateNested({ each: true })
    @Type(() => MailIdentifyDTO)
    readonly msgIds: MailIdentifyDTO[];
}
