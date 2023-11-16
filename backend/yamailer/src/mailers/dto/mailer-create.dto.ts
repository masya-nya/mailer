import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsInt, ValidateNested } from 'class-validator';
import { Mailer } from '../mailer.model';

export class MailerCreateDto {
    @ApiProperty({ example: 23564652, description: 'Id аккаунта пользователя' })
    @IsNotEmpty({ message: 'Need accountId' })
    @IsInt({ message: 'AccountId should be a number' })
    readonly accountId: number;

    @ApiProperty({ example: 1231, description: 'Id пользователя аккаунта' })
    @IsNotEmpty({ message: 'Need managerId' })
    @IsInt({ message: 'ManagerId should be a number' })
    readonly managerId: number;

    @ApiProperty({
        example: {
            serviceName: 'yandex',
            email: 'usermail@yandex.ru',
            mailUserId: '1789427891',
            photo: 'https://avatars.yandex.net/get-yapic/0/0-0/islands-200',
            accessToken: '5419ea610cf670eda1e0ab7f9b05343a56044c9937363830',
            refreshToken: '60a87c4a3bfe76c3bab83de92a0cda9356044c9937363830',
        },
        description: 'Объект почтовика',
    })
    @IsNotEmptyObject({ nullable: false }, { message: 'Need mailer object' })
    @ValidateNested({ each: true })
    @Type(() => Mailer)
    readonly mailer: Mailer;
}
