import { ApiProperty } from '@nestjs/swagger';

export class DeleteFolderBodyDto {
    @ApiProperty({ example: 'hello|world', description: 'Путь к папке' })
    public readonly path: string;
}
