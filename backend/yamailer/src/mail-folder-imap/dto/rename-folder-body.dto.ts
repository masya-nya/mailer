import { ApiProperty } from '@nestjs/swagger';

export class RenameFolderBodyDto {
    @ApiProperty({ example: 'hello|world', description: 'Путь к папке' })
    public readonly path: string;

    @ApiProperty({ example: 'Папка 2', description: 'Изменённое имя' })
    public readonly name: string;

    @ApiProperty({ example: '| или / прямая черта для яндекса', description: 'Разделитель между папками' })
    public readonly delimiter: string;
}
