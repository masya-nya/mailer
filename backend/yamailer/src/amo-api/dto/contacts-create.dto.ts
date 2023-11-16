import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, ValidateNested, IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';

export class ContactDto {
    @ApiProperty({ example: 'Павел Сараев', description: 'Название контакта' })
    @IsNotEmpty({ message: 'Need contact name' })
    @IsString({ message: 'Name should be a string' })
    readonly name: string;

    @ApiProperty({ example: 'psaraev.reon@yandex.ru', description: 'Email контакта' })
    @IsNotEmpty({ message: 'Need contact email' })
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @ApiProperty({ example: 'Текст примечания', description: 'Текст примечания' })
    @IsNotEmpty({ message: 'Need note text' })
    @IsString({ message: 'Note text should be a string' })
    readonly text: string;
}

export class CreateContactsDto {
    @ApiProperty({
        example: 39012331,
        description: 'ID аккаунта amoCRM',
    })
    @IsNotEmpty({ message: 'Need accountId' })
    @IsInt({ message: 'AccountId should be a number' })
    readonly accountId: number;

    @ApiProperty({ example: 63453245, description: 'Id ответственного' })
    @IsNotEmpty({ message: 'Need responsible user id' })
    @IsInt({ message: 'ResponsibleUser should be a number' })
    readonly responsibleUser: number;

    @ApiProperty({ example: 'true', description: 'Отправлять ли события триггерам в digital pipeline' })
    @IsOptional()
    @IsBoolean({ message: 'Trigger should be a boolean' })
    readonly isTriggerNote?: boolean;

    @ApiProperty({
        example: [{ name: 'Павел Сараев', email: 'psaraev.reon@yandex.ru' }],
        description: 'Объект контакта',
    })
    @IsNotEmpty({ message: 'Need contacts array' })
    @ValidateNested({ each: true })
    @Type(() => ContactDto)
    readonly contacts: ContactDto[];
}
