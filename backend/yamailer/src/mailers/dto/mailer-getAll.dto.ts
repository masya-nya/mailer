import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class MailerGetAllDto {
    @ApiProperty({ example: '23564652', description: 'Id аккаунта пользователя' })
    @IsNotEmpty({ message: 'Need accountId' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'AccountId should be a number' })
    readonly accountId: number;

    @ApiProperty({ example: 1231, description: 'Id пользователя аккаунта' })
    @IsNotEmpty({ message: 'Need managerId' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'ManagerId should be a number' })
    readonly managerId: number;
}
