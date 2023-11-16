import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { MailMessageId } from 'src/types/mailMessageId.dto';

export class MailsMoveMessageDto {
    @ApiProperty({ example: 23564652, description: 'Id аккаунта пользователя' })
    @IsNotEmpty({ message: 'Need accountId' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'AccountId should be a number' })
    readonly accountId: number;

    @ApiProperty({ example: 1231, description: 'Id пользователя аккаунта' })
    @IsNotEmpty({ message: 'Need managerId' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'ManagerId should be a number' })
    readonly managerId: number;

    @ApiProperty({ example: 'psaraev.reon@gmail.com', description: 'Email' })
    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @ApiProperty({ example: 'inbox', description: 'Значение типа сущности, либо id метки, либо путь к папке' })
    @IsNotEmpty({ message: 'Need mailboxPath' })
    @IsString({ message: 'MailBoxPath should be a string' })
    readonly mailboxPath: string;

    @ApiProperty({ example: 'inbox', description: 'Название раздела в почте или путь папки' })
    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'MailBoxDestinationPath should be a string' })
    readonly mailboxDestinationPath: string;

    @ApiProperty({ example: [{ msgSeq: 14, msgId: '<sdf667dfg243d22fh23.google.com>' }], description: 'Array of msgIds objects' })
    @IsNotEmpty({ message: 'Need array of msgIds objects' })
    @IsArray({ message: 'MsgIds should be an array of msgIds objects' })
    @ValidateNested({ each: true })
    @Type(() => MailMessageId)
    readonly msgIds: MailMessageId[];
}
