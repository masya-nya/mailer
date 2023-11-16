import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsString, ValidateNested, IsOptional } from 'class-validator';

export class NoteDto {
    @ApiProperty({ example: 23423542, description: 'Id сущьности у которой создаем примечание, например id сделки' })
    @IsNotEmpty({ message: 'Need entityId' })
    @IsInt({ message: 'EntityId should be a number' })
    public entityId: number;

    @ApiProperty({ example: 'Заголовок письма', description: 'Заголовок примечания' })
    @IsNotEmpty({ message: 'Need note title' })
    @IsString({ message: 'Title should be a string' })
    readonly title: string;

    @ApiProperty({ example: 'Текст письма...', description: 'Текст примечания' })
    @IsNotEmpty({ message: 'Need note text' })
    @IsString({ message: 'Text should be a string' })
    readonly text: string;

    @ApiProperty({ example: 'true', description: 'Отправлять ли события триггерам в digital pipeline' })
    @IsOptional()
    @IsBoolean({ message: 'Trigger should be a boolean' })
    readonly isTrigger?: boolean;
}

export class CreateNotesDto {
    @ApiProperty({
        example: 'paveltecac',
        description: 'Subdomain amoCRM',
    })
    @IsNotEmpty({ message: 'Need note text' })
    @IsString({ message: 'Text should be a string' })
    readonly subdomain: string;

    @IsNotEmpty({ message: 'Need accessToken' })
    @IsString({ message: 'AccessToken should be a string' })
    readonly accessToken: string;

    @ApiProperty({
        example: [{ entityId: 23423542, title: 'Заголовок письма', text: 'Текст письма...' }],
        description: 'Объект примечания',
    })
    @IsNotEmpty({ message: 'Need notes array' })
    @ValidateNested({ each: true })
    @Type(() => NoteDto)
    readonly notes: NoteDto[];
}
