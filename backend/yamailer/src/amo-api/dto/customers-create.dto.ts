import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, ValidateNested, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CustomerDto {
    @ApiProperty({ example: 'Покупатель по письму', description: 'Название покупателя' })
    @IsNotEmpty({ message: 'Need lead name' })
    @IsString({ message: 'Name should be a string' })
    readonly name: string;

    @ApiProperty({ example: 'Текст примечания', description: 'Текст примечания' })
    @IsNotEmpty({ message: 'Need note text' })
    @IsString({ message: 'Note text should be a string' })
    readonly text: string;

    @ApiProperty({ example: 12316744765, description: 'Дата следующей покупки в unix', required: false })
    @IsOptional()
    @IsInt({ message: 'nextDate should be a number' })
    readonly nextDate?: number;
}

export class CreateCustomersDto {
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
        example: [
            {
                name: 'Покупатель по письму',
                nextDate: 12316744765,
            },
        ],
        description: 'Объект Покупателя',
    })
    @IsNotEmpty({ message: 'Need customers array' })
    @ValidateNested({ each: true })
    @Type(() => CustomerDto)
    readonly customers: CustomerDto[];
}
