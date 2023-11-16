import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsArray } from 'class-validator';

export class MailerEditAccessDto {
    @ApiProperty({ example: 23564652, description: 'Id аккаунта пользователя' })
    @IsNotEmpty({ message: 'Need accountId' })
    @IsInt({ message: 'AccountId should be a number' })
    readonly accountId: number;

    @ApiProperty({
        example: [
            {
                email: 'psaraev.reon@yandex.ru',
                unallowedManagers: [1346545, 437838, 9823468],
            },
        ],
        description: 'Массив почт с массивом id у мэнеджеров которых есть доступ',
    })
    @IsArray({ message: 'Emails should be an array' })
    readonly emails: {
        email: string;
        unallowedManagers: string[];
    }[];
}
