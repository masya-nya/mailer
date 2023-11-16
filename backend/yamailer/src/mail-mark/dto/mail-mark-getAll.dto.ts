import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MailMarkGetAllDto {
    @ApiProperty({ example: 'psaraev.reon@gmail.com', description: 'Email пользователя аккаунта' })
    @IsNotEmpty({ message: 'Need email' })
    @IsString({ message: 'Email should be a string' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;
}
