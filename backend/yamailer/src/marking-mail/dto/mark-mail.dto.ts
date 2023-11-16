import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsString, IsMongoId, ValidateNested } from 'class-validator';
import { MailMessageId } from 'src/types/mailMessageId.dto';

export class MarkMailDto {
    @ApiProperty({ example: 'psaraev.reon@gmail.com', description: 'Email' })
    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @ApiProperty({ example: [{ msgSeq: 14, msgId: '<sdf667dfg243d22fh23.google.com>' }], description: 'Array of msgIds objects' })
    @IsNotEmpty({ message: 'Need array of msgIds objects' })
    @IsArray({ message: 'MsgIds should be an array of msgIds objects' })
    @ValidateNested({ each: true })
    @Type(() => MailMessageId)
    readonly msgIds: MailMessageId[];

    @ApiProperty({ example: ['64e710e83cb0ddb9ee2aaf1a'], description: 'MarkId' })
    @IsNotEmpty({ message: 'Need array of markId' })
    @IsArray({ message: 'MarkId should be an array' })
    @IsMongoId({ each: true, message: 'MarkId should be a mongoId' })
    readonly markIds: string[];
}
