import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FolderDeleteDto {
    @ApiProperty({ example: 'hello|world', description: 'Путь к папке' })
    @IsNotEmpty({ message: 'Need path' })
    @IsString({ message: 'Path should be a string' })
    public readonly path: string;
}
