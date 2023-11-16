import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsEmail, IsIn, IsInt, IsMongoId, IsNotEmpty, IsString, Min, ValidateIf } from 'class-validator';
import { QueryFilters, QUERY_FILTERS } from '../consts/queryParams';

export class MailsGetDatePagesDto {
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

    @ApiProperty({ example: '2023-06-15', description: 'Дата "с"' })
    @Transform(({ value }) => (value === '' ? null : value))
    @ValidateIf(({ dateTo }) => dateTo !== null)
    @IsDateString({}, { message: 'DateTo should be in yyyy-mm-dd format' })
    readonly dateFrom: string | null;

    @ApiProperty({ example: '2023-09-15', description: 'Дата "по"', required: true })
    @Transform(({ value }) => (value === '' ? null : value))
    @ValidateIf(({ dateTo }) => dateTo !== null)
    @IsDateString({}, { message: 'DateTo should be in yyyy-mm-dd format' })
    readonly dateTo: string | null;

    @ApiProperty({ example: 'all', description: 'Название параметра запроса' })
    @IsNotEmpty({ message: 'Need filter query type' })
    @IsIn(QUERY_FILTERS)
    readonly filterQuery: QueryFilters;

    @ApiProperty({ example: 'true', description: 'Значение параметра запроса' })
    @IsNotEmpty({ message: 'Need filter query value' })
    @Transform(({ value }) => /^true$/i.test(value))
    @IsBoolean({ message: 'FilterQueryValue should be a boolean' })
    readonly filterQueryValue: boolean;

    @ApiProperty({ example: 'inbox', description: 'Значение типа сущности, либо id метки, либо путь к папке' })
    @IsNotEmpty({ message: 'Need mailboxPath' })
    readonly mailboxPath: string;

    @ApiProperty({ example: '64f87b1fc139d8785af31d54', description: 'Mongo id метки' })
    @Transform(({ value }) => (value === '' ? null : value))
    @ValidateIf(({ markId }) => markId !== null)
    @IsMongoId()
    readonly markId: string;
}
