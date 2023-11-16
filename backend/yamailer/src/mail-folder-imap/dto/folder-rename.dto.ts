import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FolderRenameDto {
    @ApiProperty({ example: 'hello|world', description: 'Путь к папке' })
    @IsNotEmpty({ message: 'Need path' })
    @IsString({ message: 'Path should be a string' })
    public readonly path: string;

    @ApiProperty({ example: 'Папка 2', description: 'Изменённое имя' })
    @IsNotEmpty({ message: 'Need name' })
    @IsString({ message: 'Name should be a string' })
    public readonly name: string;

    @ApiProperty({ example: '| или / прямая черта для яндекса', description: 'Разделитель между папками' })
    @IsNotEmpty({ message: 'Need delimiter' })
    @IsString({ message: 'Delimiter should be a string' })
    public readonly delimiter: string;
}
