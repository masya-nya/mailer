import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AuthQueryDto {
    @ApiProperty({
        example: 39012331,
        description: 'ID аккаунта amoCRM',
    })
    @IsNotEmpty({ message: 'Need accountId' })
    @Transform((value) => Number(value))
    @IsInt({ message: 'AccountId should be a number' })
    public readonly accountId: number;

    @ApiProperty({
        example: 'def502009b3d2ab2cc759db4c1a98061767e0',
        description: 'Код авторизации(access_token)',
    })
    @IsNotEmpty({ message: 'Need token' })
    @IsString({ message: 'Token should be a string' })
    public token: string;
}
