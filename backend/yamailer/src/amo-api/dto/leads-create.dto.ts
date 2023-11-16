import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, ValidateNested, IsString, IsBoolean, IsOptional } from 'class-validator';

export class LeadDto {
    @ApiProperty({ example: 'Сделка по письму', description: 'Название сделки' })
    @IsNotEmpty({ message: 'Need lead name' })
    @IsString({ message: 'Name should be a string' })
    readonly name: string;

    @ApiProperty({ example: 'Текст примечания', description: 'Текст примечания' })
    @IsNotEmpty({ message: 'Need note text' })
    @IsString({ message: 'Note text should be a string' })
    readonly text: string;
}

export class CreateLeadsDto {
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
                name: 'Сделка по письму',
                text: 'Текст примечания',
            },
        ],
        description: 'Объект сделки',
    })
    @IsNotEmpty({ message: 'Need leads array' })
    @ValidateNested({ each: true })
    @Type(() => LeadDto)
    readonly leads: LeadDto[];
}
