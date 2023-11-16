import { ApiProperty } from '@nestjs/swagger';

export class CreateFolderBodyDto {
    @ApiProperty({ example: 'hello/world', description: 'Путь к папке' })
    public readonly path: string;

    @ApiProperty({ example: 'Папка REON', description: 'Название папки' })
    public readonly name: string;

    @ApiProperty({ example: '| или / прямая черта для яндекса', description: 'Разделитель пути к папке' })
    public readonly delimiter: string;
}
