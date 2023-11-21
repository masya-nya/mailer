import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ExactDistributionUserRdo } from './exact-distribution-template-user.rdo';

export class ExactDistributionSettingsRdo {
    @ApiProperty({ example: '652e3d40f588aef32c20ee03', description: 'User mongo id' })
    @Expose()
    @Type(() => ExactDistributionUserRdo)
    public user: ExactDistributionUserRdo;

    @ApiProperty({ example: 1, description: 'Weight' })
    @Expose()
    public weight!: number;
}
