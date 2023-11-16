import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FolderCreateDto {
    @ApiProperty({ example: 'hello/world', description: 'Путь к папке' })
    @IsOptional()
    @IsString({ message: 'Path should be a string' })
    public readonly path?: string;

    @ApiProperty({ example: 'Папка REON', description: 'Название папки' })
    @IsNotEmpty({ message: 'Need name' })
    @IsString({ message: 'Name should be a string' })
    public readonly name: string;

    @ApiProperty({ example: '| или / прямая черта для яндекса', description: 'Разделитель пути к папке' })
    @IsNotEmpty({ message: 'Need delemiter' })
    @IsString({ message: 'Delimiter should be a string' })
    public readonly delimiter: string;
}
