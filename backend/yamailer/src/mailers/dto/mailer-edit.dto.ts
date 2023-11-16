import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import MailsInfo from 'src/consts/mailsInfo';

export class MailerEditDto {
    @ApiProperty({ example: 'usermail@yandex.ru', description: 'Email почтовика' })
    @IsString({ message: 'Email should be a string' })
    readonly email: string;

    @ApiProperty({ example: 'yandex', description: 'Название почтового сервиса' })
    @IsOptional({ message: 'Need serviceName' })
    @IsString({ message: 'ServiceName should be a string' })
    @IsIn([MailsInfo.Google.Service, MailsInfo.Yandex.Service, MailsInfo.Mailru.Service])
    readonly serviceName?: (typeof MailsInfo)[keyof typeof MailsInfo]['Service'];

    @ApiProperty({ example: '1789427891', description: 'Id пользователя почты в почтовом сервисе' })
    @IsOptional({ message: 'Need mailUserId' })
    @IsString({ message: 'MailUserId should be a string' })
    readonly mailUserId?: string;

    @ApiProperty({
        example: '5419ea610cf670eda1e0ab7f9b05343a56044c9937363830',
        description: 'AccessToken для доступа к почтовому сервису',
    })
    @IsOptional({ message: 'Need AccessToken' })
    @IsString({ message: 'AccessToken should be a string' })
    readonly accessToken?: string;

    @ApiProperty({
        example: '60a87c4a3bfe76c3bab83de92a0cda9356044c9937363830',
        description: 'RefreshToken для доступа к почтовому сервису',
    })
    @IsOptional({ message: 'Need RefreshToken' })
    @IsString({ message: 'RefreshToken should be a string' })
    readonly refreshToken?: string;
}
