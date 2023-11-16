import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsHexColor, IsEmail } from 'class-validator';

export class MailMarkCreateDto {
    @ApiProperty({ example: 'psaraev.reon@gmail.com', description: 'Email пользователя аккаунта' })
    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @ApiProperty({ example: 'metka', description: 'Название метки для писем' })
    @IsNotEmpty({ message: 'Need mark name' })
    @IsString({ message: 'Mark name should be a string' })
    readonly name: string;

    @ApiProperty({ example: '#000', description: 'HEX код цвета' })
    @IsNotEmpty({ message: 'Need mark color' })
    @IsString({ message: 'Mark color should be a string' })
    @IsHexColor({ message: 'color should be a HEX' })
    readonly color: string;
}
