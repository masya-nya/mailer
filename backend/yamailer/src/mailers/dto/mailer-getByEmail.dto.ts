import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class MailerGetByEmailDto {
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
}
