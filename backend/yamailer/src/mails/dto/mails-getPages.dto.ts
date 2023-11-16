import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsIn, IsInt, IsNotEmpty, IsString, Min, IsMongoId, IsOptional } from 'class-validator';
import { QueryFilters, QUERY_FILTERS } from '../consts/queryParams';

export class MailsGetPagesDto {
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

    @ApiProperty({ example: 25, description: 'Колличество писем на страницу' })
    @IsNotEmpty({ message: 'Need limit' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'Limit should be a number' })
    @Min(1)
    readonly limit: number;

    @ApiProperty({ example: 1, description: 'Номер страницы (нумерация начинается с 1)' })
    @IsNotEmpty({ message: 'Need page' })
    @Transform(({ value }) => Number(value))
    @IsInt({ message: 'Page should be a number' })
    @Min(1)
    readonly page: number;

    @ApiProperty({ example: 'all', description: 'Название параметра запроса' })
    @IsNotEmpty({ message: 'Need filter query type' })
    @IsIn(QUERY_FILTERS)
    readonly filterQuery: QueryFilters;

    @ApiProperty({ example: 'true', description: 'Значение параметра запроса' })
    @IsNotEmpty({ message: 'Need filter query value' })
    @Transform(({ value }) => /true/i.test(value))
    @IsBoolean({ message: 'FilterQueryValue should be a boolean' })
    readonly filterQueryValue: boolean;

    @ApiProperty({ example: 'inbox', description: 'Значение типа сущности, либо id метки, либо путь к папке' })
    @IsNotEmpty({ message: 'Need mailboxPath' })
    @IsString({ message: 'MailboxPath should be a string' })
    readonly mailboxPath: string;

    @ApiProperty({ example: '64f87b1fc139d8785af31d54', description: 'Mongo id метки', required: false })
    @IsOptional()
    @IsMongoId()
    readonly markId?: string;
}
