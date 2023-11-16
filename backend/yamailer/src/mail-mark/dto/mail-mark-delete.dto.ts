import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId, IsEmail } from 'class-validator';

export class MailMarkDeleteDto {
    @ApiProperty({ example: 'psaraev.reon@gmail.com', description: 'Email пользователя аккаунта' })
    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @ApiProperty({ example: '64d229fbc1f65a3020bd1eb9', description: 'Уникальный ID метки' })
    @IsNotEmpty({ message: 'Need markId' })
    @IsString({ message: 'MarkId should be a string' })
    @IsMongoId({ message: 'MarkId should be a mongo id' })
    readonly markId: string;
}
