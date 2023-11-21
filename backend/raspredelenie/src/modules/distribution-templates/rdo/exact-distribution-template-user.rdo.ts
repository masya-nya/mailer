import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ExactDistributionUserRdo {
    @ApiProperty({ example: '652e3d40f588aef32c20ee03', description: 'User mongo id' })
    @Expose({ name: '_id' })
    @Type(() => String)
    public id: string;

    @ApiProperty({ example: 1, description: 'Weight' })
    @Expose()
    public userName!: string;
}
