import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { MailMessageId } from 'src/types/mailMessageId.dto';

export class MailsSendMessageDto {
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

    @ApiProperty({ example: 'testmailboxes@mail.ru', description: 'EmailTo' })
    @IsNotEmpty({ message: 'Need EmailTo' })
    @Transform(({ value }) => JSON.parse(value))
    @IsArray({ message: 'EmailTo should be a array of string' })
    @IsEmail({}, { each: true, message: 'Invalid emailTo' })
    readonly emailTo: string[];

    @ApiProperty({ example: 'Test subject', description: 'Subject' })
    @IsOptional()
    @IsString({ message: 'Subject should be a string' })
    readonly subject?: string;

    @ApiProperty({ example: '<h1>Test mail. Hello<h1/>', description: 'Html' })
    @IsOptional()
    @IsString({ message: 'Html should be a string' })
    readonly html?: string;

    @ApiProperty({ example: 'inbox', description: 'Значение типа сущности, либо id метки, либо путь к папке' })
    @IsNotEmpty({ message: 'Need mailboxPath' })
    @IsString({ message: 'MailBoxPath should be a string' })
    readonly mailboxPath: string;

    @ApiProperty({ example: '<sdfsdgfdsgdfg.gmail.com>', description: 'references' })
    @IsOptional()
    @Transform(({ value }) => JSON.parse(value))
    @IsArray({ message: 'references should be a array of string' })
    @ValidateNested({ each: true })
    @Type(() => MailMessageId)
    readonly references?: MailMessageId[];
}
