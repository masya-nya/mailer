import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested, IsMongoId, IsEmail } from 'class-validator';
import { MailMark } from '../mail-mark.model';

export class MailMarkEditDto {
    @ApiProperty({ example: 'psaraev.reon@gmail.com', description: 'Email пользователя аккаунта' })
    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @ApiProperty({ example: '64d229f5c1f65a3020bd1eb3', description: 'Id метки для писем' })
    @IsNotEmpty({ message: 'Need markId' })
    @IsString({ message: 'MarkId should be a string' })
    @IsMongoId({ message: 'MarkId should be a mongo id' })
    readonly markId: string;

    @ApiProperty({ example: { color: '#000', name: 'test' }, description: 'Объект метки' })
    @IsNotEmptyObject({ nullable: false }, { message: 'Need mark object' })
    @ValidateNested({ each: true })
    @Type(() => MailMark)
    readonly mark: MailMark;
}
