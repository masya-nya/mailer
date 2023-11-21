import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsArray } from 'class-validator';

export class DeleteDistributionTemplateDto {
    @ApiProperty({ example: ['652e93b4319070016399c4e3'], description: 'Array of template ids' })
    @IsNotEmpty({ message: 'Need accountId' })
    @IsArray()
    @IsMongoId({ each: true })
    public templateIds!: string[];
}
